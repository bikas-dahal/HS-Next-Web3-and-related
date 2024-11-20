import mongoose, { model, mongo, Schema } from "mongoose";
import 'dotenv/config'


mongoose.connect(process.env.MONGO_URL!)


const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,

})

const contentSchema = new Schema({
    title: String,
    link: String,
    tags: [{type: mongoose.Types.ObjectId, ref: 'Tag'}],
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true}
})


export const ContentModel = model('Content', contentSchema)
export const UserModel =  model('User', userSchema)

