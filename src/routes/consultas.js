const { Router } = require('express');
const express = require('express');
var fb  = require("firebird");
var db = require("../config");
const router = express.Router();

const consultasController = require('../controllers/consultasControllers');

//Consultas con hijos
router.get('/HijosSinP', consultasController.ListHijoSinPadre);
router.get('/verhijos/:id', consultasController.ListHijoPadre);

//Consultas con padres
router.get('/padresSinH', consultasController.listPadreSinH);
router.get('/PadresNumH', consultasController.listPadreNumH);
router.get('/Seleciconarpadre', consultasController.listPadre);

module.exports = router;