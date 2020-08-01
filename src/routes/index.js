var express = require('express');
var router = express.Router();

const mainController = require('../controllers/mainController')

// Ruta del Home
router.get('/', mainController.index);

// Ruta del AboutUs
router.get('/aboutUs', mainController.about)

// Ruta de Members
router.get('/members', mainController.members)

// Ruta de detalle de PlautUs
router.get('/detail', mainController.detail)

module.exports = router;
