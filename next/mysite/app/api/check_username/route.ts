import dbConnect from "@/lib/dbConnect";
import User from '@/models/userModel'
import { usernameValidation } from "@/schemas/signUpSchema";
import {z} from "zod";

const UsernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(req: Request, res: Response) {



    await dbConnect()

    try {
        const {searchParams} = new URL(req.url);
        const queryParam = {
            username: searchParams.get('username')
        }

        // Validation with zod
        const result = UsernameQuerySchema.safeParse(queryParam)

        if (!result.success) {
            const usernameError = result.error.format().username?._errors || []

            return Response.json({
                success: false,
                message: usernameError,
            }, {status: 400})
        }

        const { username } = result.data

        const existingVerifiedUser = await User.findOne({ username, isVerified: true })

        if (existingVerifiedUser) {
            return Response.json({
                success: false,
                message: "User already exists",
            }, {status: 400})
        }

        return Response.json({
            success: true,
            message: "Username available"
        }, {status: 400})

    } catch (err) {
        console.error('Error getting username query', err);
        return Response.json({
            success: false,
            message: 'Error getting username query'
        }, {
            status: 500
        })
    }

}