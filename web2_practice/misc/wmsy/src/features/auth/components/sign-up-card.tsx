
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {DottedSeparator} from "@/components/dotted-separator";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";
import Link from "next/link";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { SignUpFormSchema} from "@/schema";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {z} from "zod";
// import {Separator} from "@/components/ui/separator";



export const SignUpCard = () => {

    const form = useForm<z.infer<typeof SignUpFormSchema>>({
        resolver: zodResolver(SignUpFormSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    })

    const onSubmit = (values: z.infer<typeof SignUpFormSchema>) => {
        console.log(values);
    }

    return (
        <Card className={'w-full border-none h-full  md:w-[487px] shadow-none'}>
            <CardHeader className={'flex items-center justify-center p-5 text-center'}>
                <CardTitle className={'text-2xl'}>
                    Welcome 🙏
                </CardTitle>
                <CardDescription>
                    By signing up, you agree to our {" "} <Link href={'#'}><span className={'text-blue-700'}>Privacy policy</span></Link> and <Link
                    href={'#'}><span className={'text-blue-700'}>Terms of Conditions</span></Link>
                </CardDescription>
            </CardHeader>
            <div className={'px-6 mb-3'}>
                <DottedSeparator direction={'horizontal'}/>
            </div>
            <CardContent className={'p-7'}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-4'}>
                        <FormField
                            name={'name'}
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type={'text'}
                                            placeholder={'Enter your name'}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}>
                        </FormField>
                        <FormField
                            name={'email'}
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type={'email'}
                                            placeholder={'Enter your email address'}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}>
                        </FormField>
                        <FormField
                            name={'password'}
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type={'password'}
                                            placeholder={'Enter your password'}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}>
                        </FormField>
                        <Button disabled={false} size={"lg"} className={'w-full'}>Sign up</Button>
                    </form>
                </Form>

            </CardContent>
            <div className={'px-7'}>
                <DottedSeparator/>
            </div>
            <CardContent className={'flex flex-col p-7 gap-y-4'}>
                <Button size={"lg"} disabled={false} variant={"secondary"}>
                    <FcGoogle className={'mr-2 size-5'}/>
                    Login with Google</Button>
                <Button size={"lg"} disabled={false} variant={"secondary"}>
                    <FaGithub className={'mr-2 size-5'}/>
                    Login with Github</Button>

            </CardContent>
            <div className={'px-7'}>
                <DottedSeparator/>
            </div>
            <CardFooter className={'flex items-center justify-center p-7'}>
                Already have an account? &nbsp;<Link href={'/sign-in'}><span
                className={'text-blue-700 hover:underline'}>Login</span></Link>
            </CardFooter>
        </Card>
    )
}