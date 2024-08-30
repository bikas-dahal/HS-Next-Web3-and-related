import dbConnect from "@/lib/dbConnect";
import User from '@/models/userModel'
import { Message } from '@/models/userModel'

export async function POST(req: Request, res: Response) {
    await dbConnect()

    const {content, username} = await req.json()
    try {
        const user = await User.findOne({username: username})

        if (!user) {
            return Response.json({
                success: false,
                message: "User not found",
            }, {status: 404})
        }

        if (!user.isAcceptingMessage) {
            return Response.json({
                success: false,
                message: "User not accepting message",
            }, {status: 403})
        }

        const newMessage = {content, createdAt: new Date()}
        user.messages.push(newMessage as Message)
        await user.save()

        return Response.json({
            success: true,
            message: 'Successfully saved message',
        }, {status: 201})
    } catch (err) {
        console.log('Error occurred', err)
        return Response.json({
            success: false,
            message: 'Error occurred',
        }, {status: 500})
    }
}