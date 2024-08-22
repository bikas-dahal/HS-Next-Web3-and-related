import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {User} from "@/models/userModel";
import { hash } from "bcryptjs";
import {redirect} from "next/navigation";
import {dbConnect} from "@/lib/utils";

const SignupPage = () => {
    const signUp = async (formData:FormData) => {
        'use server'
        const name = formData.get('name') as string | undefined
        const email = formData.get('email') as string | undefined
        const password = formData.get('password') as string | undefined

        if (!email || !password || !name) {
            throw new Error('Please provide required details.')
        }

        // Connection to db
        await dbConnect()

        const user = await User.findOne({email})
        if (user) throw new Error('User already exists.')

        const hashedPassword = await hash(password, 10)

        // Create a user
        await User.create({
            name,
            email,
            password: hashedPassword
        });
        redirect('/login')
    }

    return (
        <div className='flex justify-center items-center h-dvh'>
            <Card>
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>Enter your details:</CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        action={signUp}
                          className='flex flex-col gap-5'>
                        <Input type='text' placeholder='Name' name='name' />
                        <Input type='email' placeholder='Email' name='email' />
                        <Input type='password' placeholder='Password' name='password' />
                        <Button type='submit'>Sign Up</Button>
                    </form>
                </CardContent>
                <CardFooter className='flex flex-col gap-3'>
                    <span>
                        Or,
                    </span>
                    <form action=''>
                        <Button type='submit' variant='outline'>Sign up with Google</Button>
                    </form>
                    <div>
                        Already have an account? <Button variant='default'><Link href='/login'>Login</Link></Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default SignupPage