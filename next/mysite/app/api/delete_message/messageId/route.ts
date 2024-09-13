import {getServerSession} from "next-(auth)";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

import dbConnect from "@/lib/dbConnect";
import { User } from 'next-(auth)'
import MyUser from '@/models/userModel'

export async function DELETE(request: Request, {params}: {params: {messageId: string}}) {
    const messageId = params.messageId

    await dbConnect()
    const session = await getServerSession(authOptions)

    const user: User = session?.user as User

    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "Not authenticated",
        }, {status: 401})
    }
    try {
        const updatedResult = await MyUser.updateOne(
            {_id: user._id},
            {$pull: {messages: {_id: messageId}}},
        )
        if (updatedResult.modifiedCount == 0) {
            return Response.json({
                success: false,
                message: "User or message not found",
            }, {status: 404})
        }

        return Response.json({
            success: true,
            message: "Message deleted successfully",
        }, {status: 200})
    } catch (err) {
        console.log('Error occurred', err)
        return Response.json({
            success: false,
            message: 'Internal server error'
        }, {status: 500})
    }
}