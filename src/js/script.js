const topBar = document.getElementById("topbar");
const mainNav = topBar.nextElementSibling;

const navLinks = [
  ...document.querySelectorAll(".main-nav__item>.main-nav__link"),
];

const removeClass = (list, className) => {
  list.forEach((element) => {
    element.classList.remove(className);
  });
};

const generateModal = (data) => {
  const { idSocio, nombre, email, direccion, url } = data;
  const fragment = document.createDocumentFragment();
  const modal =
    document.getElementById("modal") || document.createElement("div");

  modal.setAttribute("id", "modal");
  modal.classList.add("modal");

  modal.innerHTML = `<form action="${url}" method="post" class="modal-form">
  <div id="modal-close" class="modal-form__close"></div>
  <input type="hidden" name="idsocio" value="${idSocio}" />
  <div class="modal-form__item">
    <label for="nombre" class="modal-form__label">Nombre</label>
    <input type="text" class="modal-form__input" name="nombre" id="nombre" value="${nombre}" />
  </div>
  <div class="modal-form__item">
    <label for="email" class="modal-form__label">Email</label>
    <input type="text" class="modal-form__input" name="email" id="email" value="${email}" />
  </div>
  <div class="modal-form__item">
    <label for="direccion" class="modal-form__label">Direccion</label>
    <input type="text" class="modal-form__input" name="direccion" id="direccion" value="${direccion}" />
  </div>
  <div class="modal-form__item">
    <input class="modal-form__submit" type="submit" value="Enviar" />
  </div>
</form>`;

  fragment.appendChild(modal);

  document.body.insertAdjacentElement("afterbegin", modal);
  document.body.style.overflow = "hidden";

  modal.addEventListener("click", (e) => {
    if (e.target.getAttribute("id") == "modal-close") {
      modal.classList.add("modal--hide");

      document.body.removeAttribute("style");
      setTimeout(() => modal.remove(), 500);
    }
  });
};

topBar.addEventListener("click", (e) => {
  mainNav.classList.toggle("main-nav--show");
  e.target.classList.contains("hamburger-icon")
    ? e.target.classList.toggle("hamburger-icon--show")
    : e.target.firstElementChild.classList.toggle("hamburger-icon--show");
});

mainNav.addEventListener("click", (e) => {
  if (e.target.getAttribute("href") == "#") {
    e.preventDefault();
    const subList = [
      ...document.querySelectorAll(".main-nav__item>.main-nav__sublist"),
    ];

    removeClass(
      navLinks.filter((item) => item != e.target),
      "main-nav__link--active"
    );

    removeClass(
      subList.filter((item) => item != e.target.nextElementSibling),
      "main-nav__sublist--show"
    );

    e.target.nextElementSibling.classList.toggle("main-nav__sublist--show");
    e.target.classList.toggle("main-nav__link--active");
  }
});

const cardsContainer = document.getElementById("cards");
const cards = document.querySelectorAll(".cards>.card");

cardsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("card__delete")) {
    e.preventDefault();
    const url = `/${e.target.href
      .split("/")
      .filter((item, idx) => idx > 2)
      .join("/")}`;

    fetch(url, {
      method: "DELETE",
    }).then((res) => res.json());

    const newLocation = location.href.includes("?eliminado=true")
      ? location.href
      : `${location.href.substring(
          0,
          location.href.indexOf("/", location.href.indexOf("socios")) + 1
        )}?eliminado=true`;

    window.URL = newLocation;

    location.href = newLocation;
  }

  if (e.target.classList.contains("card__edit")) {
    e.preventDefault();
    const card = e.target.parentElement.parentElement;
    const idSocio = parseInt(e.target.getAttribute("data-id"));
    const nombre = card.firstElementChild.textContent;
    const email =
      card.firstElementChild.nextElementSibling.firstElementChild.textContent;
    const direccion =
      card.firstElementChild.nextElementSibling.nextElementSibling
        .firstElementChild.textContent;
    const url = e.target.getAttribute("href");

    const data = { idSocio, nombre, email, direccion, url };
    generateModal(data);
  }
});
