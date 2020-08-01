var express = require('express');
var router = express.Router();
const multer = require('multer');
const { check, validationResult, body } = require('express-validator');
const session = require('express-session');

// Controlador de usuarios
const userController = require('../controllers/userController')

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


// ruta hacia el login form
router.get('/login', userController.login);

// ruta hacia el register form
router.get('/register', userController.register);
router.post('/register', [
    check('email').isEmail().withMessage('Debe ser un E-mail valido'),
    check('password').isLength({ min: 5 }).withMessage('La contraseña debe tener minimo 5 caracteres'),
], 
    userController.storeUser)




// ruta de prueba
router.get('/list', userController.users);

/* Ruta del profile */
router.get('/profile', userController.profile)

module.exports = router;