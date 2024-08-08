import mongoose from "mongoose";

let connected = false

const connectDB = async () => {
    mongoose.set('strictQuery', true) // only the field specified in out schema are saved in our db
    if (connected) {
        console.log('MongoDB Connected already');
        return
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        connected = true
        console.log('MONGODB Connected');
    } catch (error) {
        console.log(error)
    }
}


export default connectDB;