import express, {Application, Request, Response}  from "express";
import 'dotenv/config'

const app: Application = express()
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
    res.status(200).send('Its working again')
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})