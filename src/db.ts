import * as Sequelize from "sequelize"
import * as Uuid from "node-uuid"

let config = require('./config')

function generateId() {
    return Uuid.v4();
}

let sequelize = new Sequelize(config.database, config.username, config.password, config.options)

function  defineModel(name: string, attributes: {[key: string] : any}) {
    let attrs: Sequelize.DefineAttributes = {}
    for (let key in attributes) {
        let value = attributes[key]
        if (typeof  value === 'object' && value['type']) {
            value.allowNull = value.allowNull || false
            attrs[key] = value
        }else {
            attrs[key] = {
                type: value,
                allowNull: false
            }
        }
    }
    attrs.id = {
        type: Sequelize.STRING(50),
        primaryKey: true
    }
    attrs.createdAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    }
    attrs.updatedAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    }
    attrs.version = {
        type: Sequelize.BIGINT,
        allowNull: false
    }
    return sequelize.define(name, attrs, {
        timestamps: false,
        hooks: {
            beforeValidate: function (obj: any) {
                let now = Date.now()
                if (obj.isNewRecord) {
                    if (!obj.id) {
                        obj.id = generateId()
                    }
                    obj.createdAt = now
                    obj.updatedAt = now
                    obj.version = 0
                }else {
                    obj.updatedAt = Date.now()
                    obj.version++
                }
            }
        }
    })
}

module.exports.defineModel = defineModel
module.exports.sync = () => {
    // only allow create ddl in non-production environment:
    if (process.env.NODE_ENV !== 'production') {
        sequelize.sync({ force: true });
    } else {
        throw new Error('Cannot sync() when NODE_ENV is set to \'production\'.');
    }
}