"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    database: 'MyNodeBlog',
    username: 'root',
    password: '123456',
    options: {
        host: 'localhost',
        port: 3306,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 30000
        }
    }
};
//# sourceMappingURL=config.js.map