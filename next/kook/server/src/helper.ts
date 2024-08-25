import {ZodError} from "zod";
import ejs from "ejs";
import path from "path";
import {fileURLToPath} from "url";


export const formatError = (err: ZodError):any => {
    let errors: any = {}
    err.errors?.map((issue) => {
        errors[issue.path?.[0]] = issue.message
    })

    return errors
}

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const renderEmailEjs = async (filename:string, payload:any):Promise<string> => {
    const html:string = await ejs.renderFile(path.join(__dirname, `views/emails/${filename}.ejs`), payload);
    return html
}