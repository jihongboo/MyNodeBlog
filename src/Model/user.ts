import * as Sequelize from "sequelize"
let db = require('../db')
module.exports = db.defineModel('user', {
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    password: Sequelize.STRING(100),
    email: {
        type: Sequelize.STRING(100),
        unique: true
    }
})