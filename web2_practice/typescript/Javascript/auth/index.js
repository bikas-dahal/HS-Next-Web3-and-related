const express = require('express')
const jwt = require('jsonwebtoken')
const {UserModel, TodoModel} = require("./db");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { z } = require('zod')


let dotenv = require("dotenv").config({ path: "./.env" });


// const users = []


JWT_SECRET = '12andoaoun31'

mongoose.connect(process.env.MONGO_URL)

const app = express()
app.use(express.json()) // parsing the json body


app.post('/signup',async (req, res) => {
    // const username = req.body.username
    // const password = req.body.password

    const requiredBody = z.object({
        email: z.string().email(),
        password: z.string(),
        name: z.string().min(2).max(20),
    })

    const parsedBody = requiredBody.safeParse(req.body)

    if (!parsedBody.success) {
        return res.status(400).json({
            message: "Inputs should be string",
            error: parsedBody.error
        })
    }

    const { email, password, name } = req.body;

    const hashedPassword = await bcrypt.hash(password, 6);

    try {
        await UserModel.create({
            email,
            password: hashedPassword,
            name,
        })

        res.json({
            "message": "Sign up successfully",
        })
        console.log(req.body)

    } catch (e) {
        res.status(400).send({
            error: e.message,
        })
    }


})

// let foundUser = null

app.post('/login', async (req, res) => {

    // const username = req.body.username
    // const password = req.body.password

    const { email, password } = req.body;

    const foundUser = await UserModel.findOne({
        email
    })
    if (!foundUser) {
        res.status(403).send({
            message: "User not exist",
        })
    }

    // const foundUser = users.find(user => user.username === username && user.password === password)

    const passwordMatch = await bcrypt.compare(password, foundUser.password)

    if (!passwordMatch) {
        res.status(403).send({
            message: "Invalid credentials",
        })
    }

    console.log(foundUser)

    const token = jwt.sign({id: foundUser._id.toString()}, JWT_SECRET)

    res.json({
        token
    })

    console.log(token)
    console.log(req.body)
    // console.log(users)
})

app.post('/todo', authMiddleware, async (req, res)=> {
    const userId = req.userId
    const title = req.body.title

    console.log(userId)

    await TodoModel.create({
        title,
        userId
    })

    res.json({
        status: 200,
        message: "todo created"
    })
})

app.get('/todos', authMiddleware, async (req, res)=> {
    console.log(req)
    const userId = req.userId

    const todos = await TodoModel.find({
        userId
    })


    console.log(userId)

    res.json({
        id: userId,
        todos
    })
})

function authMiddleware(req, res, next) {
    const token = req.headers.token

    const decodedData = jwt.verify(token, JWT_SECRET)

    if (decodedData.id) {
        req.userId = decodedData.id
        next()
    } else {
        res.status(403).send({
            message: "Invalid token",
        })
    }
}


app.get('/me', authMiddleware, async (req, res) => {
    const token = req.headers.token
    console.log(token)
    try {
        const decoded_info = jwt.verify(token, JWT_SECRET)
        // const unAuthDecodedInfo = jwt.decode(token)
        console.log(decoded_info)

        // const foundUser = users.find(user => user.username === decoded_info.username)
        // const foundUser = users.find(user => user.username === req.username)
        const foundUser = await UserModel.findOne({
            _id: decoded_info.id
        })


        if (foundUser) {
            res.json({
                email: foundUser.email,
                password: foundUser.password,
            })
        } else {
            res.status(403).send({
                message: "Invalid token",
            })
        }
    } catch (e) {
        res.status(403).send({
            error: 'Invalid token',
        })
    }
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})