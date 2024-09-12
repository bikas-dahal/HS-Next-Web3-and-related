import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
export const formatError = (err) => {
    let errors = {};
    err.errors?.map((issue) => {
        errors[issue.path?.[0]] = issue.message;
    });
    return errors;
};
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const renderEmailEjs = async (filename, payload) => {
    const html = await ejs.renderFile(path.join(__dirname, `views/emails/${filename}.ejs`), payload);
    return html;
};
