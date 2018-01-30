"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const fs = require("fs");
let router = new Router();
function addMapping(mapping) {
    for (let url in mapping) {
        if (url.startsWith('GET ')) {
            router.get(url.substring(4), mapping[url]);
        }
    }
}
function addControllers(dir) {
    let files = fs.readdirSync(__dirname + '/' + dir).filter((f) => {
        return f.endsWith('.js');
    });
    for (let f of files) {
        let mapping = require(__dirname + '/' + dir + '/' + f);
        addMapping(mapping);
    }
}
module.exports = function (dir) {
    let controllers_dir = dir || 'controllers';
    addControllers(controllers_dir);
    return router.routes();
};
//# sourceMappingURL=controller.js.map