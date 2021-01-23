const express = require("express");
const router = express.Router();
const controller = require("../controllers/prestamo.controller");

router.get("/prestamos", controller.getPrestamos);

module.exports = router;
