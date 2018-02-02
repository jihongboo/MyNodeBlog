"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const Uuid = require("node-uuid");
const config_1 = require("./config");
function generateId() {
    return Uuid.v4();
}
let sequelize = new Sequelize(config_1.default.database, config_1.default.username, config_1.default.password, config_1.default.options);
function defineModel(name, attributes) {
    let attrs = {};
    for (let key in attributes) {
        let value = attributes[key];
        if (typeof value === 'object' && value['type']) {
            value.allowNull = value.allowNull || false;
            attrs[key] = value;
        }
        else {
            attrs[key] = {
                type: value,
                allowNull: false
            };
        }
    }
    attrs.id = {
        type: Sequelize.STRING(50),
        primaryKey: true
    };
    attrs.createdAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    attrs.updatedAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    attrs.version = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    return sequelize.define(name, attrs, {
        timestamps: false,
        hooks: {
            beforeValidate: function (obj) {
                let now = Date.now();
                if (obj.isNewRecord) {
                    if (!obj.id) {
                        obj.id = generateId();
                    }
                    obj.createdAt = now;
                    obj.updatedAt = now;
                    obj.version = 0;
                }
                else {
                    obj.updatedAt = Date.now();
                    obj.version++;
                }
            }
        }
    });
}
exports.default = defineModel;
function sync() {
    // only allow create ddl in non-production environment:
    if (process.env.NODE_ENV !== 'production') {
        sequelize.sync({ force: true });
    }
    else {
        throw new Error('Cannot sync() when NODE_ENV is set to \'production\'.');
    }
}
exports.sync = sync;
//# sourceMappingURL=db.js.map