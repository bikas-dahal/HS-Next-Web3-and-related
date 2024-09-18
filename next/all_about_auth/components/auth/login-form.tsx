'use client'

import React from 'react';
import {CardWrapper} from "@/components/auth/card-wrapper";
import {Input} from '@/components/ui/input'

import * as z from 'zod'
import {LoginSchema} from "@/schemas";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {Form, FormLabel, FormControl, FormMessage, FormItem, FormField} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import {login} from "@/actions/login";
import {useTransition} from "react";


export function LoginForm() {

    const [isPending, startTransition] = useTransition()
    const [error, setError] = React.useState<string | undefined>('');
    const [success, setSuccess] = React.useState<string | undefined>('');

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError('')
        setSuccess('')

        startTransition(() => {
            // fetch('api/')
            login(values)
                .then((data) => {
                    setError(data.error)
                    setSuccess(data.success)
                })
        })
    }

    return (
        <CardWrapper
            hlabel={'👋 Login'}
            headerLabel={'Welcome back'}
            backButtonLabel={"Don't have an account"}
            backButtonHref={'/auth/register'}
            showSocial={true}
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className={'space-y-6'}
                >
                    <div className={'space-y-4'}>
                        <FormField render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder={'ram@gmail.com'} disabled={isPending} type="email"/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                            )}
                                   name='email'
                                   control={form.control}
                        />
                        <FormField render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isPending} placeholder={'******'} type="password"/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name='password'
                                   control={form.control}/>
                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button type="submit" color="primary" disabled={isPending} className={'w-full'}>Login</Button>
                </form>
            </Form>
        </CardWrapper>
    );
}

