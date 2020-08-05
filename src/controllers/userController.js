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
                id: users[users.length - 1].id + 1,
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

    processLogin:  (req, res) => {
            let validation = validationResult(req)
            let errors = validation.errors
            if (errors == '') {
                let userToLog = users.find(user => user.email == req.params.userEmail)
                console.log(userToLog);
                if (userToLog && bcrypt.compareSync(req.body.password, userToLog.password)) {
                    // req.session.userId = userToLog.id;
                    res.send('hola')
                }
            } else {
                res.render('login', {errors})
            }
    },

    profile: (req, res) => {
        res.render('profile')
    },
}

module.exports = userController