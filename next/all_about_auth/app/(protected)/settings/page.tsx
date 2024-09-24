'use client'

import React, {useTransition} from 'react';
import {Button} from "@/components/ui/button";
import {useSession, signOut} from "next-auth/react";
import {logOut} from "@/actions/logout";
import {useCurrentUser} from "@/hooks/use-current-user";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {settings} from "@/actions/settings";
import * as z from 'zod'
import {Form, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {SettingSchema} from "@/schemas";
import {FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Input} from "@/components/ui/input";

function Page() {

    const { update } = useSession()
    const [isPending, startTransition] = useTransition()
    const [error, setError] = React.useState<string | undefined>();
    const [success, setSuccess] = React.useState<string | undefined>();

    const form = useForm<z.infer<typeof SettingSchema>>({
        resolver: zodResolver(SettingSchema),
        defaultValues: {
            name: ''
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
             .catch((err) => {
                 setError(err, 'Something went wrong')
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
                                </FormItem>
                            )}  />

                        </div>
                        <Button type={'submit'} />
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

export default Page;