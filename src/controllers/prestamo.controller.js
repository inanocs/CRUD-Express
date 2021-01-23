const conn = require("../../dbConnection/connection");

const controller = {};

controller.getPrestamos = (req, res, next) => {
  conn.query(
    "SELECT S.NOMBRE SOCIO, L.TITULO TITULO, DATE_FORMAT(P.FECHAPRESTAMO,'%d/%m/%Y')FECHAPRESTAMO FROM PRESTAMO P INNER JOIN SOCIO S ON P.IDSOCIO= S.IDSOCIO INNER JOIN EJEMPLAR E ON P.IDEJEMPLAR = E.IDEJEMPLAR INNER JOIN LIBRO L ON E.ISBN = L.ISBN",
    (err, rows) => {
      if (err) next(new Error(err));
      else rows.forEach((user) => console.log(user));
    }
  );
};

module.exports = controller;
