var express = require('express');
var router = express.Router();
const path = require('path');

const multer = require('multer');
const { check, validationResult} = require('express-validator');
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
router.post('/login',[
    check('email').isEmail().withMessage('E-mail no válido'),
    check('password').isLength({ min: 5 }).withMessage('Contraseña no válida')
], userController.processLogin)

// Ruta hacia el register form
router.get('/register', userController.register);
router.post('/register', validationMiddleware, userController.storeUser);

/* Ruta del profile */
router.get('/profile/:id', userController.profile);

// Ruta para desloguear al usuario
router.get('/logout', userController.logout);

/* Ruta de profile edit */
router.get('/editProfile', userController.editProfile)

module.exports = router;