"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const BodyParser = require("koa-bodyparser");
let Controller = require('./controller');
let Staticfiles = require('./static-files');
let Templating = require('./templating');
let isProduction = process.env.NODE_ENV === 'production';
let app = new Koa();
app.use(async (ctx, next) => {
    console.log(`Progress ${ctx.request.method} ${ctx.request.url}`);
    await next();
});
app.use(Staticfiles('/static/', process.cwd() + '/static'));
app.use(Templating());
app.use(BodyParser());
app.use(Controller());
app.listen(3000);
console.log('app started at port 3000...');
//# sourceMappingURL=app.js.map