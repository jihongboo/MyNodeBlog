//  database
import * as Sequelize from "sequelize"

let config = {
    database: 'MyNodeBlog', // 使用哪个数据库
    username: 'root', // 用户名
    password: '123456', // 口令
    options: {
        host: 'localhost', // 主机名
        port: 3306, // 端口号，MySQL默认3306
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 30000
        }
    }
};

module.exports = config;