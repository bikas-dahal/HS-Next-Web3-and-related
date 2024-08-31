'use client'

import {useParams, useRouter} from "next/navigation";
import {useToast} from "@/components/ui/use-toast";
import { useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {verifySchema} from "@/schemas/signUpSchema";
import * as z from "zod";
import axios, {AxiosError} from "axios";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {ApiResponse} from "@/types/apiResponse";

const VerifyAccount = () => {
    const router = useRouter()
    const params = useParams<{ username: string}>()
    const { toast } = useToast()

    const form = useForm <z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema)
    })

    const onSubmit = async (data: z.infer<typeof verifySchema>) => {
        try {
            const response = await axios.post(`/api/verify_code`, {
                username: params.username,
                code: data.code
            })

            toast({
                title: 'Success',
                description: response.data.message,
            })

            router.replace(`login`)

        } catch (err) {
            console.log('Error while verifying', err)
            const axiosError = err as AxiosError<ApiResponse>;
            let errorMessage = axiosError.response?.data.message;
            toast({
                title: 'Error',
                description: errorMessage,
                variant: 'destructive'
            })

        }
    }


    return(
        <div className='flex justify-center items-center min-h-screen bg-gray-100'>
            <div>
                Enter the code sent on your email.
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name='code'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Verify Code
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder='verify code' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                />
                    <Button type="submit">Submit</Button>
                </form>

            </Form>
        </div>
    )
}

export default VerifyAccount;