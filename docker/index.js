const express = require('express')
const mongoose = require('mongoose')

const app = express()

const port =3000

mongoose.connect(process.env.MONGODB_URI, {});

const EntrySchema = new mongoose.Schema({
    text: String,
    date: {
        type: Date, default: Date.now
    }
})

const Entry = mongoose.model('Entry', EntrySchema)



app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

