import express from 'express'
import { ContentModel, UserModel } from './db'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from './config'
import { authMiddleware } from './middleware'


const app = express()

app.use(express.json())

app.post('/api/v1/signup', async (req, res) => {
    const { username, password } = req.body

    // todo: zod validation and password hashing
    try {
        await UserModel.create({
            username, 
            password
        })
    
        res.json({
            message: 'User registered successfully'
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            error: error
        })
        
    }
})

app.post('/api/v1/login', async (req, res) => {
    const { username, password } = req.body

    const user = await UserModel.findOne({
        username, 
        password
    })

    if (user) {
        const token = jwt.sign({
            id: user._id,
            username
        }, JWT_SECRET)

        res.json({
            token
        })
    } else {
        res.json({
            error: 'Invalid credentials'
        })
    }

    console.log(user);
    
    res.json({
        user
    })

    
})

app.post('/api/v1/content', authMiddleware, async (req, res) => {
    const { link, title } = req.body

    await ContentModel.create({
        link,
        title,
        // @ts-ignore
        userId: req.userId,
        tags: []

    })

    res.json({
        success: "Content created successfully"
    })
})

app.get('/api/v1/content', authMiddleware, async (req, res) => {
    // @ts-ignore
    const userId = req.userId

    const content = await ContentModel.find({
        userId
    }).populate('userId', 'username')

    res.json({
        content
    })
})

app.delete('/api/v1/content', authMiddleware, async (req, res) => {
    // @ts-ignore
    const userId = req.userId

    const contentId = req.body.contentId; 

    const content = await ContentModel.deleteMany({
        contentId,
        userId
    });

    res.json({
        content
    })
})

app.post('/api/v1/brain/share', (req, res) => {

})

app.get('/api/v1/brain/:shareLink', (req, res) => {

})



app.listen(3001, () => {
  console.log('Server is running on port 3000')
})

