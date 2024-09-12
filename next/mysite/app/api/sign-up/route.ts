import dbConnect from "@/lib/dbConnect";
import User from '@/models/userModel';
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(req: Request) {
    await dbConnect();

    try {
        const { username, email, password } = await req.json() as { username: string, email: string, password: string };
        console.log('Parsed request body:', { username, email, password });

        // Check for existing user with the same username
        const existingUserVerifiedByUsername = await User.findOne({
            username,
            isVerified: true,
        });

        if (existingUserVerifiedByUsername) {
            return new Response(JSON.stringify({
                success: false,
                message: "Username already exists",
            }), {
                status: 409,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        }

        // Check for existing user with the same email
        const existingUserByEmail = await User.findOne({ email }).select('+password');
        const verifyCode = Math.floor(100000 + Math.random() * 90000).toString();
        console.log('Generated verify code:', verifyCode);

        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return new Response(JSON.stringify({
                    success: false,
                    message: 'Email already used',
                }), {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            } else {
                // Update the unverified existing user with a new password and verification code
                existingUserByEmail.password = await bcrypt.hash(password, 10);
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
                await existingUserByEmail.save();
            }
        } else {
            // If no existing user, create a new user
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isAcceptingMessage: true,
                messages: [],
                isVerified: false,
            });

            await newUser.save();
        }

        // Send verification email
        const emailResponse = await sendVerificationEmail(email, username, verifyCode);

        if (!emailResponse.success) {
            return new Response(JSON.stringify({
                success: false,
                message: emailResponse.message,
            }), {
                status: 409,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        }

        return new Response(JSON.stringify({
            success: true,
            message: 'User registered successfully, please verify your email',
        }), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            }
        });

    } catch (error) {
        console.error('Error registering user:', error);
        return new Response(JSON.stringify({
            success: false,
            message: 'Error registering user internal error',
            error: error instanceof Error ? error.message : 'Unknown error',
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }
}
