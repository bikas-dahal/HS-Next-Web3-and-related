'use client'

import {CardWrapper} from "@/components/auth/card-wrapper";
import {BeatLoader} from "react-spinners";
import {useSearchParams} from "next/navigation";
import React, {useCallback, useEffect} from "react";
import {newVerification} from "@/actions/new-verification";
import {FormSuccess} from "@/components/form-success";
import {FormError} from "@/components/form-error";


export const NewVerificationForm = () => {


    const [error, setError] = React.useState<string | undefined>('');
    const [success, setSuccess] = React.useState<string | undefined>('');


    const searchParams = useSearchParams()

    const token = searchParams.get("token")

    const onSubmit = useCallback(() => {
        if (success || error) {return }
        if (!token) {
            setError('Opps, Token is missing, 🙅')
        }

        newVerification(token)
            .then((data) => {
                setSuccess(data.success)
                setError(data.error)
            })
            .catch(() => {
                setError('Something went wrong');
            })
        console.log(token)
    }, [token, success, error])

    useEffect(() => {
        onSubmit()
    }, [onSubmit])

    return (
        <CardWrapper headerLabel={'Hang on 🛫...'} hlabel={'Confirming your Verification🔓'} backButtonLabel={'Back to login'} backButtonHref={'/auth/login'} >
            <div className={'flex items-center justify-center w-full'}>
                {!success && !error && (

                <BeatLoader />
                )}
                <FormSuccess message={success} />
                {!success && (

                    <FormError message={error} />
                )}
            </div>
        </CardWrapper>
    )
}