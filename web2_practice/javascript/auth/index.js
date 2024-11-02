const express = require('express')
const jwt = require('jsonwebtoken')

const users = []

JWT_SECRET = '12andoaoun31'

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        status: 200,
        data: 'checking'
    })
})

app.post('/signup', (req, res) => {
    // const username = req.body.username
    // const password = req.body.password

    const { username, password } = req.body;

    users.push({
        username,
        password
    })

    res.json({
        "message": "Sign up successfully",
    })
    console.log(req.body)

})

// let foundUser = null

app.post('/login', (req, res) => {

    // const username = req.body.username
    // const password = req.body.password

    const { username, password } = req.body;


    const foundUser = users.find(user => user.username === username && user.password === password)

    if (!foundUser) {
        res.status(403).send({
            message: "User not exist",
        })
    }


    console.log(foundUser)

    const token = jwt.sign({username}, JWT_SECRET)

    res.json({
        token
    })
    console.log(token)
    console.log(req.body)
    console.log(users)
})

function authMiddleware(req, res, next) {
    const token = req.headers.token

    const decodedData = jwt.verify(token, JWT_SECRET)

    if (decodedData.username) {
        req.username = decodedData.username
        next()
    } else {
        res.status(403).send({
            message: "Invalid token",
        })
    }
}


app.get('/me', authMiddleware, (req, res) => {
    // const token = req.headers.token

    try {
        // const decoded_info = jwt.verify(token, JWT_SECRET)
        // const unAuthDecodedInfo = jwt.decode(token)

        // const foundUser = users.find(user => user.username === decoded_info.username)
        const foundUser = users.find(user => user.username === req.username)


        if (foundUser) {
            res.json({
                username: foundUser.username,
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