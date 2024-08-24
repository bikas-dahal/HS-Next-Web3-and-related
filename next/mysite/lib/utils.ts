import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import mongoose from "mongoose";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const dbConnect = async () => {
  try {
    if (mongoose.connections && mongoose.connections[0].readyState) return;

    const { connection } = await mongoose.connect(
        process.env.MONGO_URI as string,
        {
          dbName: 'mysite'
        }
    )
    console.log('Connected to DB Connector', connection.host)
  } catch (error) {
    throw new Error('Error connecting to DB Connector');
  }
}