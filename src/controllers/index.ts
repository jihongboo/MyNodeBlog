import { Router } from "express-serve-static-core";
import { IRouterContext } from "koa-router";

var fn_index = async (ctx: IRouterContext, next: () => Promise<any>) => {
    ctx.response.body = `<h1>Index</h1>
    <form action="/signin" method="post">
        <p>Name: <input name="name" value="koa"></p>
        <p>Password: <input name="password" type="password"></p>
        <p><input type="submit" value="Submit"></p>
    </form>`
}

var fn_signin = async (ctx: IRouterContext, next: () => Promise<any>) => {
    var name = ctx.request.body.name || ''
    var password = ctx.request.body.password || ''
    if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
}

module.exports = {
    'GET /': fn_index,
    'POST /': fn_signin
}