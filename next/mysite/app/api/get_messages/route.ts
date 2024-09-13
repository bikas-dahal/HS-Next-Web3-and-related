import { getServerSession } from "next-(auth)";
import MyUser from '@/models/userModel'
import {authOptions} from "@/app/api/auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import { User } from 'next-(auth)'
import mongoose from "mongoose";
import {messageSchema} from "@/schemas/signUpSchema";

export async function GET(req: Request, res: Response) {

    await dbConnect()

    const session = await getServerSession(authOptions)

    const user: User = session?.user as User

    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "Not authenticated",
        }, {status: 401})
    }
    const userId = new mongoose.Types.ObjectId(user._id)

    try {
        const user = await MyUser.aggregate([
            {$match: {id: userId}},
            {$unwind: '$messages'},
            { $sort: { createdAt: -1 } },
            // { $sort: { 'messages.createdAt': -1 } },
            {$group: {_id: '$_id', messages: {$push: '$messages'}}},
        ])

        if(!user || user.length === 0) return Response.json({
            success: false,
            message: "No messages found with given user",
        }, {status: 400})

        return Response.json({
            success: true,
            messages: user[0].messages,
        }, {status: 200})
    } catch (err) {
        console.log('Error occurred', err)
        return Response.json({
            success: false,
            message: 'Error occurred',
        }, {status: 500})
    }
}

