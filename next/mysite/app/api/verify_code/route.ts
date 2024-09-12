import dbConnect from "@/lib/dbConnect";
import User from '@/models/userModel'

export async function POST(req: Request, res: Response) {

    await dbConnect()

    try {
        const { username, code } = await req.json()

        const decodedUsername = decodeURIComponent(username)
        const user = await User.findOne({username: decodedUsername})

        if (!user) {
            return Response.json({
                success: false,
                message: "Invalid username",
            }, {status: 500})
        }

        const isCodeValid = user.verifyCode === code
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()

        if (isCodeNotExpired && isCodeValid) {
            user.isVerified = true
            await user.save()

            return Response.json({
                success: true,
                message: "User verified",
            }, {status: 200})
        } else if (!isCodeNotExpired ) {
            return Response.json({
                success: false,
                message: "Verification code expired, sign up again",
            }, {status: 400})
        } else {
            return Response.json({
                success: false,
                message: "Verification code incorrect",
            }, {status: 400})
        }
        

} catch (err) {
      console.log('Error verifying user', err)
        return Response.json({
            success: false,
            message: 'Error verify code',
        }, {status: 500})
    }


}
