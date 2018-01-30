import * as Koa from "koa"
import * as BodyParser from "koa-bodyparser"

let Controller = require('./controller')
let Staticfiles = require('./static-files')
let Templating = require('./templating')

let isProduction = process.env.NODE_ENV === 'production';
let app = new Koa()

app.use(async (ctx, next) => {
    console.log(`Progress ${ctx.request.method} ${ctx.request.url}`)
    await next()
})

app.use(Staticfiles('/static/', process.cwd() + '/static'))
app.use(Templating())
app.use(BodyParser())
app.use(Controller())

app.listen(3000)
console.log('app started at port 3000...')