'use client'

import React, {useTransition} from 'react';
import {Button} from "@/components/ui/button";
import {useSession, signOut} from "next-auth/react";
import {logOut} from "@/actions/logout";
import {useCurrentUser} from "@/hooks/use-current-user";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {settings} from "@/actions/settings";
import * as z from 'zod'
import { useForm} from "react-hook-form";
import {Form, FormDescription, FormMessage} from '@/components/ui/form'
import {zodResolver} from "@hookform/resolvers/zod";
import {SettingSchema} from "@/schemas";
import {FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {FormSuccess} from "@/components/form-success";
import {FormError} from "@/components/form-error";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {UserRole} from "@prisma/client";
import {Switch} from "@/components/ui/switch";

function Page() {

    const user = useCurrentUser()

    const { update } = useSession()
    const [isPending, startTransition] = useTransition()
    const [error, setError] = React.useState<string | undefined>();
    const [success, setSuccess] = React.useState<string | undefined>();

    const form = useForm<z.infer<typeof SettingSchema>>({
        resolver: zodResolver(SettingSchema),
        defaultValues: {
            name: user?.name || undefined, // for prisma database ... in settings
            email: user?.email || undefined,
            password: undefined,
            newPassword: undefined,
            role: user?.role || undefined,
            isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
        }
    })

    const onSubmit = (values: z.infer<typeof SettingSchema>) => {
        startTransition(() => {
         settings(values)
             .then((data) => {
                 if (data.error) {
                    setError(data.error)
                 }

                 if (data.success) {
                     update()
                     setSuccess(data.success)
                 }
             })
             .catch(() => {
                 setError('Something went wrong')
             })
        })
    }

    // const session = useSession()
    // const user = useCurrentUser()
    //
    // const onClick = () => {
    //     logOut()
    //     // signOut()
    // }
    console.log('User', user)


    return (
        <Card className={'w-[600px] '}>
            <CardHeader>
                <p className={'text-2xl font-semibold text-center'}>
                    Settings 🛞
                </p>
            </CardHeader>
            <CardContent className={'space-y-4'}>

                <Form {...form}>
                    <form className={'space-y-4'} onSubmit={form.handleSubmit(onSubmit)}>
                        <div>
                            <FormField
                                control={form.control}
                                name={'name'}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder={'Hari Ram'} disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}  />

                            {user?.isOAuth === false && (
                                <>


                            <FormField
                                control={form.control}
                                name={'email'}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder={'hari@gmail.com'} type={'email'} disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}  />

                            <FormField
                                control={form.control}
                                name={'password'}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder={'******'} type={'password'} disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}  />

                            <FormField
                                control={form.control}
                                name={'newPassword'}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder={'******'} type={'password'} disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}  />

                            <FormField
                                control={form.control}
                                name={'isTwoFactorEnabled'}
                                render={({ field }) => (
                                <FormItem className={'flex flex-row items-center justify-between border rounded-lg shadow-sm p-3'}>
                                    <div className={'space-y-0.5'}>
                                        <FormLabel>Two Factor Authentication</FormLabel>
                                        <FormDescription>Enable two factor authentication for your account</FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch disabled={isPending} checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                </FormItem>
                            )}  />
                                </>
                            )}


                            <FormField
                                control={form.control}
                                name={'role'}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={'Select a role'}>
                                                </SelectValue>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value={UserRole.ADMIN} >
                                                Admin
                                            </SelectItem>
                                            <SelectItem value={UserRole.USER} >
                                                User
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}  />

                        </div>
                        <FormSuccess message={success} />
                        <FormError message={error} />
                        <Button disabled={isPending} type={'submit'} >Save</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

export default Page;