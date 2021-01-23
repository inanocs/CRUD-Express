const express = require("express");
const path = require("path");
const morgan = require("morgan");
const app = express();
const PORT = 3002;

// Settings, config del servidor
app.set("port", process.env.PORT || PORT);
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/views"));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Routes

app.use(require("./routes/index.routes"));
app.use(require("./routes/socios.routes"));
app.use(require("./routes/prestamo.routes"));

// Errors

app.use((err, req, res, next) => {
  res.send({ error: err.message });
});

// Public
app.use(express.static(path.join(__dirname, "../public")));

// Listen
app.listen(app.get("port"), () =>
  console.log(`Biblioteca listening on port ${app.get("port")}!`)
);
