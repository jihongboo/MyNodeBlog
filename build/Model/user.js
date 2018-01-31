"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
let db = require('../db');
module.exports = db.defineModel('user', {
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    password: Sequelize.STRING(100),
    email: {
        type: Sequelize.STRING(100),
        unique: true
    }
});
//# sourceMappingURL=user.js.map