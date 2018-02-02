import * as Sequelize from "sequelize"
import DB from '../db'

export default DB('user', {
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    password: Sequelize.STRING(100),
    email: {
        type: Sequelize.STRING(100),
        unique: true
    }
})
