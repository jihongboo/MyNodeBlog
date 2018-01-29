"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const Koa = require("koa");
let app = new Koa();
app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2!</h1>';
});
app.listen(3000);
console.log('app started at port 3000...');
//# sourceMappingURL=app.js.map