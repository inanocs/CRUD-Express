const conn = require("../../dbConnection/connection");

const socios = {};

socios.getSocios = (req, res, next) => {
  conn.query("SELECT * FROM SOCIO ORDER BY NOMBRE", (err, rows) => {
    if (err) next(new Error(err));
    else {
      if (req.url.includes("?eliminado=true")) {
        res.render("./pages/socios/listadosocios", {
          title: "Socios",
          allUsers: rows,
          confirmarOperacion: "Usuario eliminado con éxito",
        });
      } else {
        res.render("./pages/socios/listadosocios", {
          title: "Socios",
          allUsers: rows,
        });
      }
    }
  });
};

socios.modificarSocio = (req, res, next) => {
  const { idsocio, nombre, email, direccion } = req.body;
  console.log(parseInt(idsocio), nombre, email, direccion);
  conn.execute(
    "UPDATE SOCIO SET NOMBRE=?, EMAIL=?, DIRECCION=? WHERE IDSOCIO=?",
    [nombre, email, direccion, parseInt(idsocio)]
  ),
    (err, rows) => {
      if (err) {
        next(new Error(err));
        console.log("HOLA err?");
      }
    };

  conn.query("SELECT * FROM SOCIO ORDER BY NOMBRE", (err, rows) => {
    if (err) next(new Error(err));
    else {
      res.render("./pages/socios/listadosocios", {
        title: "Socios",
        allUsers: rows,
        confirmarOperacion: "Socio editado con éxito.",
      });
    }
  });
};

socios.getAltaSocio = (req, res, next) => {
  res.render("./pages/socios/nuevosocio", { title: "Nuevo socio" });
};

socios.nuevoSocio = (req, res, next) => {
  const { nombre, email, direccion } = req.body;

  conn.execute(
    "INSERT INTO SOCIO (NOMBRE, EMAIL, DIRECCION) VALUES (?,?,?)",
    [nombre, email, direccion],
    (err, rows) => {
      if (err) {
        next(err);
      } else {
        res.render("./pages/socios/nuevosocio", {
          title: "Nuevo socio",
          confirmarOperacion: "Socio creado con éxito",
        });
      }
    }
  );
};

socios.eliminarSocio = (req, res, next) => {
  conn.execute("DELETE FROM SOCIO WHERE IDSOCIO = ?", [req.params.id]),
    (err, rows) => {
      if (err) next(new Error(err));
      else {
        res.send({ ok: true });
      }
    };
};

module.exports = socios;
