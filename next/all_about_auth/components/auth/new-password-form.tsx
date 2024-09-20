'use client'

import React from 'react';
import {CardWrapper} from "@/components/auth/card-wrapper";
import {Input} from '@/components/ui/input'

import * as z from 'zod'

import { newPasswordSchema } from '@/schemas/index'

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {Form, FormLabel, FormControl, FormMessage, FormItem, FormField} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import {useTransition} from "react";
import { reset } from "@/actions/reset";
import {useSearchParams} from "next/navigation";
import {newPassword} from "@/actions/new-password";


export function NewPasswordForm() {

    const [isPending, startTransition] = useTransition()
    const [error, setError] = React.useState<string | undefined>('');
    const [success, setSuccess] = React.useState<string | undefined>('');

    const searchParams = useSearchParams()
    const token = searchParams.get('token');

    const form = useForm<z.infer<typeof newPasswordSchema>>({
        resolver: zodResolver(newPasswordSchema),
        defaultValues: {
            password: "",
        }
    })

    const onSubmit = (values: z.infer<typeof newPasswordSchema>) => {
        setError('')
        setSuccess('')

        console.log(values)

        startTransition(() => {
            // fetch('api/')
            newPassword(values, token!)
                .then((data) => {
                    setError(data.error)
                    setSuccess(data.success)
                })
        })
    }

    return (
        <CardWrapper
            hlabel={'Provide your new password'}
            headerLabel={'Now remember ok, ☺️'}
            backButtonLabel={"Back to Login"}
            backButtonHref={'/auth/login'}
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className={'space-y-6'}
                >
                    <div className={'space-y-4'}>
                        <FormField render={({field}) => (
                            <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder={'******'} disabled={isPending} type="password"/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                                   name='password'
                                   control={form.control}
                        />

                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button type="submit" color="primary" disabled={isPending} className={'w-full'}>Reset Password</Button>
                </form>
            </Form>
        </CardWrapper>
    );
}

