import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number;
}

const connection: ConnectionObject = {}

async function dbConnect() {
    if (connection.isConnected) {
        console.log('Db already connected');
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017');

        connection.isConnected = db.connections[0].readyState;
        console.log('Connected to DB');
    } catch (error) {
        console.log('Error connecting to DB', error);
        process.exit(1);  // Ensure that this does not run in a serverless environment.
    }
}

export default dbConnect;
