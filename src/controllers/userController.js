const fs = require('fs');
const path = require('path');

const bcrypt = require('bcryptjs');
const session = require('express-session');
const { check, validationResult, body } = require('express-validator');

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
        } else {
            try {
                const existUser = await DB.User.findAll({
                    where: {
                        email: req.body.email
                    }
                })

                if (existUser.length > 0) {
                    let errors = [{
                        msg: 'Este usuario ya existe'
                    }]
                    res.render('register', { errors })
                } else {
                    req.body.password = bcrypt.hashSync(req.body.password, 8)
                    let newUser = await DB.User.create(req.body)
                    res.redirect('/users/login')
                }
            } catch (error) {
                res.send(error)
            }
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
                    let errors = [{
                        msg: 'Credenciales invalidas'
                    }]
                    res.render('login', { errors })
                }
                let userPassword = bcrypt.compareSync(req.body.password, user.password)
                if (userPassword) {
                    req.session.userId = user.id;
                    res.redirect('/users/profile/' + user.id)

                } else {
                    let errors = [{
                        msg: 'Credenciales invalidas'
                    }]
                    res.render('login', { errors })
                }
            }
        } catch (error) {
            res.send(error)
        }
    },

    profile: async (req, res) => {
        const userInfo = await DB.User.findByPk(req.params.id)
        res.render('profile', { userInfo })
    },

    logout: (req, res) => {
        req.session.destroy()
        res.redirect('/users/login');
    },

    editProfile: (req, res) => {
        res.render('editProfile')
    }
}

module.exports = userController