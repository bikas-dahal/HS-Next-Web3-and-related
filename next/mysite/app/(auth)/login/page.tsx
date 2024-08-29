'use client'

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
// import {auth, signIn} from "@/auth";
import LoginForm from "@/components/client/form";
import {signIn, signOut, useSession} from "next-auth/react";
import {redirect} from "next/navigation";

export default function Component() {
    const { data : session } = useSession();
    if (session) {
        return (
            <>
            Signed in as {session.user.email}
                <button onClick={() => signOut()}>
                    Sign out
                </button>
            </>
        )
    }
    return (
        <>
        Not signed in.
            <button onClick={() => signIn()}>Login</button>
        </>
    )
}

//
// const LoginPage = async () => {
//     'use server'
//     // const session = await auth()
//     // if (session?.user) {
//     //     redirect('/')
//     // }
//
//     return(
//         <div className='flex justify-center items-center h-dvh'>
//             <Card>
//                 <CardHeader>
//                     <CardTitle>Login</CardTitle>
//                     <CardDescription>Enter email and password:</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                     <LoginForm />
//                 </CardContent>
//                 <CardFooter className='flex flex-col gap-3'>
//                     <span>
//                         Or,
//                     </span>
//                     <form action={
//                         async () => {
//                             'use server'
//                             await signIn('google')
//                         }
//                     }>
//                         <Button type='submit' variant='outline'>Login with Google</Button>
//                     </form>
//                     <div>
//                     Don't have an account? <Button variant='default'><Link href='/signup'>Sign Up</Link></Button>
//                     </div>
//                 </CardFooter>
//             </Card>
//         </div>
//     )
// }
//
// export default LoginPage;