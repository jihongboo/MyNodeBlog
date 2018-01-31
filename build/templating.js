"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Nunjucks = require("nunjucks");
function createEnv(path, fileOpts, configs) {
    let realPath = path || 'views';
    let env = new Nunjucks.Environment(new Nunjucks.FileSystemLoader(realPath, fileOpts), configs);
    return env;
}
function template(path, fileOpts, configs) {
    let env = createEnv(path, fileOpts, configs);
    return async (ctx, next) => {
        ctx.render = function (view, model) {
            ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
            ctx.response.type = 'text/html';
        };
        await next();
    };
}
module.exports = template;
//# sourceMappingURL=templating.js.map