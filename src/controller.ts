import * as Router from "koa-router"
import * as fs from "fs"

let router = new Router()

function addMapping(mapping: { [index: string]: Router.IMiddleware}) {
    for (let url in mapping) {
        if (url.startsWith('GET ')) {
            router.get(url.substring(4), mapping[url])
        }
    }
}

function addControllers(dir: string) {
    let files = fs.readdirSync(__dirname + '/' + dir).filter((f) => {
        return f.endsWith('.js')
    })
    for (let f of files) {
        let mapping = require(__dirname + '/' + dir + '/' + f)
        addMapping(mapping)
    }
}

module.exports = function(dir: string) {
    let controllers_dir = dir || 'controllers'
    addControllers(controllers_dir)
    return router.routes()
}