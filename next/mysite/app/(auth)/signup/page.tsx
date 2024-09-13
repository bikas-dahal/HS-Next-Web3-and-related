'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/apiResponse";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {useSession} from "next-(auth)/react";


const SignupPage = () => {
    const { data: session, status } = useSession()
    const [username, setUsername] = useState("");
    const [usernameMessage, setUsernameMessage] = useState("");
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const debounced = useDebounceCallback(setUsername, 400);
    const { toast } = useToast();
    const router = useRouter();

    // Zod implementation
    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: '',
            email: '',
            password: ''
        }
    });

    useEffect(() => {
        if (status === "authenticated") {
            // Redirect to home page if user is authenticated
            router.push("/");
        }
    }, [status, router]);


    useEffect(() => {
        const checkUsernameUnique = async () => {
            if (username) {
                setIsCheckingUsername(true);
                setUsernameMessage('');

                try {
                    const response = await axios.get(`/api/check_username?username=${username}`);
                    setUsernameMessage(response.data.message);
                } catch (err) {
                    const axiosError = err as AxiosError<ApiResponse>;
                    setUsernameMessage(axiosError.response?.data.message ?? 'Username cannot be checked now');
                } finally {
                    setIsCheckingUsername(false);
                }
            }
        };

        checkUsernameUnique();
    }, [username]);

    const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
        setIsSubmitting(true);
        try {
            const response = await axios.post(`/api/sign-up`, data);

            toast({
                title: 'Success',
                description: response.data.message,
            });

            router.replace(`/verify/${username}`);
        } catch (err) {
            console.error('Error in sign up', err);
            const axiosError = err as AxiosError<ApiResponse>;
            let errorMessage = axiosError.response?.data.message;
            toast({
                title: 'Error',
                description: errorMessage,
                variant: 'destructive'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-100'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="username" {...field} onChange={(e) => {
                                        field.onChange(e);
                                        debounced(e.target.value);
                                    }} />
                                </FormControl>
                                {isCheckingUsername && <Loader2 className='animate-spin' />}
                                <p>{usernameMessage}</p>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type='email' placeholder="email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder="Password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={isSubmitting} type="submit">
                        {isSubmitting ? (
                            <>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Submitting
                            </>
                        ) : 'Signup'}
                    </Button>
                </form>
            </Form>
            <div>
                Already have an account?
                <Link href='/login' className='text-blue-500 hover:text-blue-900'>Login</Link>
            </div>
        </div>
    );
};

export default SignupPage;










// import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
// import {Input} from "@/components/ui/input";
// import {Button} from "@/components/ui/button";
// import Link from "next/link";
// import User from "@/models/userModel";
// import { hash } from "bcryptjs";
// import {redirect} from "next/navigation";
// import {dbConnect} from "@/lib/utils";
//
// const SignupPage = () => {
//     const signUp = async (formData:FormData) => {
//         'use server'
//         const name = formData.get('name') as string | undefined
//         const email = formData.get('email') as string | undefined
//         const password = formData.get('password') as string | undefined
//
//         if (!email || !password || !name) {
//             throw new Error('Please provide required details.')
//         }
//
//         // Connection to db
//         await dbConnect()
//
//         const user = await User.findOne({email})
//         if (user) throw new Error('User already exists.')
//
//         const hashedPassword = await hash(password, 10)
//
//         // Create a user
//         await User.create({
//             name,
//             email,
//             password: hashedPassword
//         });
//         redirect('/login')
//     }
//
//     return (
//         <div className='flex justify-center items-center h-dvh'>
//             <Card>
//                 <CardHeader>
//                     <CardTitle>Sign Up</CardTitle>
//                     <CardDescription>Enter your details:</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                     <form
//                         action={signUp}
//                           className='flex flex-col gap-5'>
//                         <Input type='text' placeholder='Name' name='name' />
//                         <Input type='email' placeholder='Email' name='email' />
//                         <Input type='password' placeholder='Password' name='password' />
//                         <Button type='submit'>Sign Up</Button>
//                     </form>
//                 </CardContent>
//                 <CardFooter className='flex flex-col gap-3'>
//                     <span>
//                         Or,
//                     </span>
//                     <form action=''>
//                         <Button type='submit' variant='outline'>Sign up with Google</Button>
//                     </form>
//                     <div>
//                         Already have an account? <Button variant='default'><Link href='/login'>Login</Link></Button>
//                     </div>
//                 </CardFooter>
//             </Card>
//         </div>
//     )
// }
//
// export default SignupPage