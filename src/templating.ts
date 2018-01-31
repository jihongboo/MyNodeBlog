import * as Nunjucks from "nunjucks"
import * as Koa from "koa"

function createEnv(path?: string, fileOpts?: Nunjucks.FileSystemLoaderOptions, configs?: Nunjucks.ConfigureOptions) {
    let realPath = path || 'views'
    let env = new Nunjucks.Environment(
        new Nunjucks.FileSystemLoader(realPath, fileOpts), configs
    )
    return env
}

function template(path?: string, fileOpts?: Nunjucks.FileSystemLoaderOptions, configs?: Nunjucks.ConfigureOptions) {
    let env = createEnv(path, fileOpts, configs)
    return async (ctx: Koa.Context, next: () => Promise<any>) => {
        ctx.render = function (view: string, model: any) {
            ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}))
            ctx.response.type = 'text/html'
        }
        await next()
    }
}

module .exports = template