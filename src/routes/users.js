var express = require('express');
var router = express.Router();

const multer = require('multer');
const { check, validationResult, body } = require('express-validator');
const session = require('express-session');

const validationMiddleware = require('../middlewares/validationMiddleware');

// Controlador de usuarios
const userController = require('../controllers/userController');


// el metodo storage de multer guarda la foto del avatar de cada usuario en una carpeta
// let storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/images/users')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     }
// });

// let upload = multer({ storage: storage });


// Ruta hacia el login form
router.get('/login', userController.login);

// Ruta hacia el register form
router.get('/register', userController.register);
router.post('/register', validationMiddleware, userController.storeUser)

/* Ruta del profile */
router.get('/profile', userController.profile)

module.exports = router;