"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const BodyParser = require("koa-bodyparser");
let controller = require('./controller');
let staticFiles = require('./static-files');
let template = require('./templating');
let user = require('./Model/user');
let app = new Koa();
// let isProduction = process.env.NODE_ENV === 'production';
app.use(async (ctx, next) => {
    console.log(`Progress ${ctx.request.method} ${ctx.request.url}`);
    await next();
});
let db = require('./db');
db.sync();
app.use(async () => {
    let one = await user.create({
        name: 'bobo',
        gender: true,
        email: 'jihongboo@qq.com',
        password: '123456'
    });
    console.log('create: ' + JSON.stringify(one));
});
app.use(staticFiles('/static/', process.cwd() + '/static'));
app.use(BodyParser());
app.use(template());
app.use(controller());
app.listen(3000);
console.log('app started at port 3000...');
//# sourceMappingURL=app.js.map