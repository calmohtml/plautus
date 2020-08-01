var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController')

/* Ruta del login */
router.get('/login', userController.login);

/* Ruta del register */
router.get('/register', userController.register);

/* Ruta del profile */
router.get('/profile', userController.profile)

module.exports = router;