const fs = require('fs');
const path = require('path');

const mainController = {
    index: (req, res)=> {
        res.render('index')
    },

    about: (req, res)=> {
        res.render('about-us')
    },

    members: (req, res)=> {
        res.render('plans')
    },

}

module.exports = mainController
