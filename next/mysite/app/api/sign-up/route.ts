import dbConnect from "@/lib/dbConnect";
import User from '@/models/userModel'
import bcrypt from "bcryptjs";
import {sendVerificationEmail} from "@/helpers/sendVerificationEmail";

export async function POST(req: Request) {
    await dbConnect()

    try {
        const { username, email, password } = await req.json()
        console.log('Parsed request body:', { username, email, password });
        const existingUserVerifiedByUsername = await User.findOne({
            username,
            isVerified: true,
        });
        console.log('No existing user')


        if (existingUserVerifiedByUsername) {
            return Response.json(
                {
                    success: false,
                    message: "Username already exists",
                },
                {
                    status: 409,
                }
            );
        }

        console.log('no username')

        const existingUserByEmail = await User.findOne({ email }).select('+password');
        const verifyCode = Math.floor(100000 + Math.random() * 90000).toString()

        console.log(verifyCode)
        console.log(existingUserByEmail)

        if (existingUserByEmail) {
            console.log('email existing')
            if (existingUserByEmail.isVerified) {
                // console.log('existingUserByEmail')
                return Response.json({
                    success: false,
                    message: 'Email already used'
                }, {
                    status: 400,
                })
            } else {
                existingUserByEmail.password = await bcrypt.hash(password, 10)
                existingUserByEmail.verifyCode = verifyCode
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)
                await existingUserByEmail.save()
                // console.log('existing user')
            }
        } else {
            console.log('no user')
            console.log(password)
            const hashedPassword = await bcrypt.hash(password, 10)
            console.log('Password hashed', hashedPassword)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)

            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isAcceptingMessage: true,
                messages: [],
                isVerified: false,
            })

            await newUser.save()
        }

        // Send verification email

        const emailResponse = await sendVerificationEmail(
            email,
            username,
            verifyCode
        )

        if (!emailResponse.success) {
            return Response.json({
                success: false,
                message: emailResponse.message
            }, {
                status: 409,
            })
        }

        return Response.json({
            success: true,
            message: 'User registered successfully, please verify your email',
        }, {
            status: 201,
        })



    } catch (error) {
        console.log('last ko')
        return Response.json({
            success: false,
            message: 'Error registering user internal error',
            error
            },
            {
                status: 500
            }
        )
    }
}