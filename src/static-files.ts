import * as path from "path"
import * as mime from "mime"
import * as fs from "mz/fs"
import * as Koa from "koa"
import { stat } from "mz/fs";

export default function staficFiles(url: string, dir: string) {
    return async (ctx: Koa.Context, next: () => Promise<any>) => {
        let rpath = ctx.request.path
        if(rpath.startsWith(url)) {
            let fp = path.join(dir, rpath.substring(url.length))
            if (await fs.exists(fp)) {
                ctx.response.type = mime.getType(rpath)
                ctx.response.body = await fs.readFile(fp)
            }else {
                ctx.response.status = 404
            }
        }else {
            await next()
        }
    }
}