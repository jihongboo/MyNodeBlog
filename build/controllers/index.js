"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let fn_index = async (ctx) => {
    ctx.render('index.html', { title: 'Welcome' });
};
let fn_signIn = async (ctx) => {
    let name = ctx.request.body.name || '';
    let password = ctx.request.body.password || '';
    if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    }
    else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
};
module.exports = {
    'GET /': fn_index,
    'POST /': fn_signIn
};
//# sourceMappingURL=index.js.map