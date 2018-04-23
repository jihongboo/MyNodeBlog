"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const BodyParser = require("koa-bodyparser");
const controller_1 = require("./controller");
const static_files_1 = require("./static-files");
const templating_1 = require("./templating");
let app = new Koa();
// let isProduction = process.env.NODE_ENV === 'production';
app.use(async (ctx, next) => {
    console.log(`Progress ${ctx.request.method} ${ctx.request.url}`);
    await next();
});
// DB.sync()
// app.use(async () => {
//     let one = await  User.create({
//         name: 'bobo',
//         gender: true,
//         email: 'jihongboo@qq.com',
//         password: '123456'
//     })
//     console.log('create: ' + JSON.stringify(one))
// })
app.use(static_files_1.default('/static/', process.cwd() + '/static'));
app.use(BodyParser());
app.use(templating_1.default());
app.use(controller_1.default());
app.listen(3000);
console.log('app started at port 3000...');
//# sourceMappingURL=app.js.map