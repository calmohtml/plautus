var express = require('express');
var router = express.Router();

const mainController = require('../controllers/mainController')

// ruta de home
router.get('/', mainController.index);

// ruta aboutUs
router.get('/aboutUs', mainController.about)

module.exports = router;
