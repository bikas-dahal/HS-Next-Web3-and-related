import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/options";
import dbConnect from '@/lib/dbConnect'
import MyUser from '@/models/userModel'
import  { User } from 'next-auth';
import cards from "@/components/Cards";

export async function POST(req: Request, res: Response) {
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user: User = session?.user as User

    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "Invalid Authentication",
        }, {status: 401})
    }

    const userId = session.user._id

    const {acceptMessages} = await req.json()

    try {
        const updatedUser = await MyUser.findByIdAndUpdate(userId,{
            isAcceptingMessage: acceptMessages
        }, {new: true})

        if (!updatedUser) {
            return Response.json({
                success: false,
                message: 'Error registering user status internal error',
            }, {status: 401})
        }
        return Response.json({
            success: true,
            message: 'Successfully registered',
            updatedUser
        }, {status: 200})


    } catch (err) {
        console.log('Failed to update user status', err)
        return Response.json({
            success: false,
            message: 'Error registering user status internal error',
        }, {status: 500})
  }

}

export async function GET(req: Request, res: Response) {
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user: User = session?.user as User
try {

    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: 'No session user',
        },{status: 401})
    }

    const userId = user._id

    const foundUser = await MyUser.findById(userId)
    if (!foundUser) {
        return Response.json({
            success: false,
            message: 'User not found',
        }, {status: 404})
    }

    return Response.json({
        success: true,
        isAcceptingMessages: foundUser.isAcceptingMessage,
        message: 'Successfully found',
    }, {status: 200})

} catch (err) {
        console.error('Error getting user status', err)
    return Response.json({
        success: false,
        message: 'Error getting user status',
    },{status: 500})
}

}