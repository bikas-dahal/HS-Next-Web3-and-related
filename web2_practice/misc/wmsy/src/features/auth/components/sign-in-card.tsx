
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {DottedSeparator} from "@/components/dotted-separator";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {signInFormSchema, signInType} from "@/schemas/signInSchema";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import Link from "next/link";
import {useLogin} from "@/features/auth/api/use-login";

export const SignInCard = () => {

    const form = useForm<signInType>({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {email: "", password: ""},
    })

    const { mutate } = useLogin()

    const onSubmit = (values: signInType) => {
        mutate({json: values})
        // console.log(values);
    }

    return (
        <Card className={'w-full border-none h-full  md:w-[487px] shadow-none'}>
            <CardHeader className={'flex items-center justify-center p-5 text-center'}>
                <CardTitle className={'text-2xl'}>
                    Welcome back 🙏
                </CardTitle>
            </CardHeader>
                <div className={'px-6 mb-3'}>
                    <DottedSeparator direction={'vertical'} />
                </div>
            <CardContent className={'p-7'}>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-4'}>
                    <FormField
                        name={'email'}
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        type={'email'}
                                        placeholder={'Enter your email address'}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}>
                    </FormField>

                    <FormField
                        name={'password'}
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        type={'password'}
                                        placeholder={'Enter your password'}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}>
                    </FormField>
                    {/*<Input required type={'password'} value={password} onChange={() => {}} min={6} max={128} placeholder={'Enter password'} disabled={false} />*/}
                    <Button disabled={false} size={"lg"} className={'w-full'}>Login</Button>
                </form>
                </Form>
            </CardContent>
            <div className={'px-7'}>
                <DottedSeparator />
            </div>
            <CardContent className={'flex flex-col p-7 gap-y-4'}>
                <Button size={"lg"} disabled={false} variant={"secondary"}>
                    <FcGoogle className={'mr-2 size-5'} />
                    Login with Google</Button>
                <Button size={"lg"} disabled={false} variant={"secondary"}>
                    <FaGithub className={'mr-2 size-5'} />
                    Login with Github</Button>

            </CardContent>
            <div className={'px-7'}>
                <DottedSeparator />
            </div>
            <CardFooter className={'flex items-center justify-center p-7'}>
                Did&apos;t have an account? <Link href={'/sign-up'}><span className={'text-blue-700 hover:underline'}>&nbsp;Register</span></Link>
            </CardFooter>
        </Card>
    )
}