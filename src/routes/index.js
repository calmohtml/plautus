var express = require('express');
var router = express.Router();

const mainController = require('../controllers/mainController')

// ruta de home
router.get('/', mainController.index);

// ruta hacia aboutUs
router.get('/aboutUs', mainController.about)

// ruta hacia members
router.get('/members', mainController.members)

// ruta para detalle
router.get('/detail', mainController.detail)

module.exports = router;
