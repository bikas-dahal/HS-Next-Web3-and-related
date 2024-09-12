import express from "express";
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
// Queues
import './jobs/index.js';
import Routes from "./routes/index.js";
import ejs from "ejs";
import { emailQueue, emailQueueName } from "./jobs/EmailJob.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Set a view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// App routes
app.use(Routes);
app.get("/", async (req, res) => {
    const html = await ejs.renderFile(__dirname + '/views/emails/welcome.ejs', {
        name: 'Hari'
    });
    // await sendEmail("lamevil965@amxyy.com", "testing smtp", html)
    await emailQueue.add(emailQueueName, {
        to: 'lamevil965@amxyy.com',
        subject: 'Testing Queue something',
        body: html
    });
    return res.json({
        msg: "success",
    });
    // return res.render('emails/welcome', {name: 'Harilal'})
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
