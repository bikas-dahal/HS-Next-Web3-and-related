import express, {Application, Request, Response}  from "express";
import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'
import ejs from "ejs";
import {sendEmail} from "./config/mail.js";

// Queues
import './jobs/index.js'
import {emailQueue, emailQueueName} from "./jobs/EmailJob.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url))


const app: Application = express()
const port = process.env.PORT || 3000;

// Set a view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/",async (req: Request, res: Response) => {
    const html = await ejs.renderFile(path.join(__dirname, 'views/emails/welcome.ejs'), {
        name: 'Syam'
    });
    // await sendEmail("cisahesos.sipefipi@gotgel.org\n", "testing smtp", html)
    await emailQueue.add(emailQueueName, {
        to: 'cisahesos.sipefipi@gotgel.org',
        subject: 'Testing something something',
        body: html
    })
    return res.json({
        msg: "success",
    })
})



app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})