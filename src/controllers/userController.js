const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const userController = {
    login: (req, res)=> {
        res.render('login')
    },

    register: (req, res)=> {
        res.render('register')
    },

    users: (req, res)=>{
        res.send({users})
    },

}

module.exports = userController