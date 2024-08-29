import mongoose, {Schema, Document} from 'mongoose';


export interface Message extends Document{
    content: string;
    createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export interface User extends Document{
    username: string,
    email: string,
    password: string,
    verifyCode: string,
    verifyCodeExpiry: Date;
    isAcceptingMessage: boolean,
    googleId: string,
    image: string,
    isVerified: boolean,
    messages: Message[]
}

const userSchema: Schema<User> = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: false,
        select: false
    },
    googleId: {
        type: String,
    },
    image: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verifyCode: {
        type: String,
        required: [true, 'Verify code is required'],
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, 'Verify code expiry is required'],
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true
    },
    messages: [MessageSchema]
})

const User = mongoose.models?.User as mongoose.Model<User> || mongoose.model<User>('User', userSchema);

export default User