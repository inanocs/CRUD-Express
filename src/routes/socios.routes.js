const socios = require("../controllers/socios.controller");
const express = require("express");
const router = express.Router();

// Rutas get
router.get("/socios", socios.getSocios);
router.get("/socios/listado", socios.getSocios);
router.get("/socios/eliminar/:id?eliminado=true", socios.getSocios);
router.get("/socios/altasocio", socios.getAltaSocio);

// Rutas POST
router.post("/socios/nuevosocio", socios.nuevoSocio);
router.post("/socios/editar/:id", socios.modificarSocio);

// Rutas DELETE
router.delete("/socios/eliminar/:id", socios.eliminarSocio);

module.exports = router;
