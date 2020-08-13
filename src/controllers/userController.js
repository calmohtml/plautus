const fs = require('fs');
const path = require('path');

const bcrypt = require('bcryptjs');
const session = require('express-session');
const { check, validationResult, body } = require('express-validator');

// base de datos en json
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

// base de datos en sequelize 
const DB = require('../database/models')
const { sequelize } = require('../database/models')
const OP = DB.Sequelize.Op

const userController = {
    login: (req, res) => {
        res.render('login')
    },

    register: (req, res) => {
        res.render('register')
    },

    storeUser: async (req, res) => {
        let validation = validationResult(req)
        let errors = validation.errors
        if (errors != '') {
            res.render('register', { errors })
        }
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password)
        }
        try {
            await DB.User.create(newUser)
            return res.redirect('/users/profile')
        } catch (error) {
            res.send(error)
        }
    },

    processLogin: async (req, res) => {
        let validation = validationResult(req);
        let errors = validation.errors;
        try {
            if (errors == '') {
                let user = await DB.User.findOne({
                    where: {
                        email: req.body.email
                    }
                });
                if (user == undefined) {
                    res.render('login', {errors})
                }
                if (user && bcrypt.compareSync(req.body.password, user.password)) {
                    req.session.userId = user.id;
                    res.redirect('/users/profile/' + user.id)
                }
            } else {
                res.render('login', {errors})
            }
        } catch (error) {
            res.send(error)
        }
    },

    profile: async (req, res) => {
        const userInfo = await DB.User.findByPk(req.params.id)
        res.render('profile', { userInfo })
    },
}

module.exports = userController