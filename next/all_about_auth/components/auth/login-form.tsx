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
import {useSearchParams} from "next/navigation";
import Link from "next/link";


export function LoginForm() {
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl')
    const urlError = searchParams.get('error') === 'OAuthAccountNotLinked' ? 'Email already in use with different Provider' : ''

    const [showTwoFactor, setShowTwoFactor] = React.useState(false);
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
            login(values, callbackUrl)
                .then((data) => {
                    if (data?.error) {
                        form.reset();
                        setError(data.error)
                    }

                    if (data?.success) {
                        form.reset();
                        setSuccess(data.success)
                    }

                    if (data?.twoFactor) {
                        setShowTwoFactor(true)
                    }
                })
                .catch(() => {
                    setError('Something went wrong',);
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
                        {showTwoFactor && (
                            <FormField render={({field}) => (
                                <FormItem>
                                    <FormLabel>2FA Code</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder={'123123'} disabled={isPending} type="text"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                                       name='code'
                                       control={form.control}
                            />
                        )}
                        {!showTwoFactor && (
                            <>
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
                                <Button size={'sm'} asChild variant={'link'} className={'px-0'}>
                                    <Link href={'/auth/reset'}>
                                        Forget password?
                                    </Link>
                                </Button>
                                <FormMessage/>
                            </FormItem>
                        )} name='password'
                                   control={form.control}/>
                            </>
                        )}
                    </div>
                    <FormError message={error || urlError}/>
                    <FormSuccess message={success}/>
                    <Button type="submit" color="primary" disabled={isPending} className={'w-full'}>
                        {showTwoFactor ? 'Confirm' : 'Login'}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
}

