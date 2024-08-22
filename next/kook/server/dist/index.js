import express from "express";
import 'dotenv/config';
const app = express();
const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.status(200).send('Its working again');
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
