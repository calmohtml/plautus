const fs = require('fs');
const path = require('path');

const bcrypt = require('bcryptjs');
const session = require('express-session');
const { check, validationResult, body } = require('express-validator');

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const userController = {
    login: (req, res) => {
        res.render('login')
    },

    register: (req, res) => {
        res.render('register')
    },

    storeUser: (req, res) => {
        let validation = validationResult(req)
        let errors = validation.errors
        if (errors != '') {
            res.render('register', { errors })
        } else {
            const newUser = {
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password),
                repeatpassword: bcrypt.hashSync(req.body.repeatpassword)
            }
            let newDB = [...users, newUser]
            fs.writeFileSync(usersFilePath, JSON.stringify(newDB, null, ' '))
            res.redirect('/users/profile')
        }
    },

    profile: (req, res) => {
        res.render('profile')
    },
}

module.exports = userController