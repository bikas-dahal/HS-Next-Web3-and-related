'use client'

import React from 'react';
import {CardWrapper} from "@/components/auth/card-wrapper";
import {Input} from '@/components/ui/input'

import * as z from 'zod'

import { resetSchema } from '@/schemas/index'

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {Form, FormLabel, FormControl, FormMessage, FormItem, FormField} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import {useTransition} from "react";
import { reset } from "@/actions/reset";


export function ResetForm() {

    const [isPending, startTransition] = useTransition()
    const [error, setError] = React.useState<string | undefined>('');
    const [success, setSuccess] = React.useState<string | undefined>('');

    const form = useForm<z.infer<typeof resetSchema>>({
        resolver: zodResolver(resetSchema),
        defaultValues: {
            email: "",
        }
    })

    const onSubmit = (values: z.infer<typeof resetSchema>) => {
        setError('')
        setSuccess('')

        console.log(values)

        startTransition(() => {
            // fetch('api/')
            reset(values)
                .then((data) => {
                    setError(data.error)
                    setSuccess(data.success)
                })
        })
    }

    return (
        <CardWrapper
            hlabel={'Reset your Password'}
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

                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button type="submit" color="primary" disabled={isPending} className={'w-full'}>Send Reset Email</Button>
                </form>
            </Form>
        </CardWrapper>
    );
}

