import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import {auth, signIn} from "@/auth";
import LoginForm from "@/components/client/form";
import {redirect} from "next/navigation";

const LoginPage = async () => {
    'use server'
    const session = await auth()
    if (session?.user) {
        redirect('/')
    }

    return(
        <div className='flex justify-center items-center h-dvh'>
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Enter email and password:</CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
                <CardFooter className='flex flex-col gap-3'>
                    <span>
                        Or,
                    </span>
                    <form action={
                        async () => {
                            'use server'
                            await signIn('google')
                        }
                    }>
                        <Button type='submit' variant='outline'>Login with Google</Button>
                    </form>
                    <div>
                    Don't have an account? <Button variant='default'><Link href='/signup'>Sign Up</Link></Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default LoginPage;