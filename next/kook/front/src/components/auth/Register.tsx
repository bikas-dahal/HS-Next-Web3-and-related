'use client'

import React, {useEffect, useState} from 'react'
import {registerAction} from "@/actions/authActions";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {SubmitButton} from "@/components/common/submitBtn";
import { useFormState } from 'react-dom'
import {toast} from "sonner";

const Register = () => {
    type FormState = {
        status: number;
        message: string;
        errors: Record<string, string>;
    };

    const initState = {
        status: 0,
        message: '',
        errors: {}
    }

    const [state, formAction] = useFormState(registerAction, initState)

    useEffect(() => {
        if ( state.status === 500 ) {
            toast.error(state.message)
        } else if (state.status === 200) {
            toast.success(state.message);
        }
    }, [state]);
    // console.log(state.errors)

    if (!state) {
        return null
    }

    return (
        <form action={formAction}>
            <div className='mt-3'>
                <Label htmlFor='name'>Name</Label>
                <Input id='name' type='text' name='name' placeholder='Enter your name...'/>
                <span className='text-red-500'>
                     {state?.errors?.name || ''}
                </span>
            </div>
            <div className='mt-3'>
                <Label htmlFor='email'>Email</Label>
                <Input id='email' type='email' name='email' placeholder='Enter your email...'/>
                <span className='text-red-500'>
                    {state.errors?.email}
                </span>
            </div>
            <div className='mt-3'>
                <Label htmlFor='password'>Password</Label>
                <Input id='password' name='password' type='password' placeholder='Password here...'/>
                <span className='text-red-500'>
                    {state.errors?.password}
                </span>
            </div>
            <div className='mt-3'>
                <Label htmlFor='cpassword'>Confirm Password</Label>
                <Input id='cpassword' name='confirm_password' type='password'
                       placeholder='Please your password again...'/>
                <span className='text-red-500'>
                    {state.errors?.confirm_password}
                </span>
            </div>
            <div className='text-right m-2'>

                {/*<Link href='/forgot-password' className='bg-slate-100 hover:text-sky-900 hover:bg-white m-2 rounded p-1'>Forget Password?</Link>*/}
            </div>
            <div className='mt-3'>
                <SubmitButton text='Register'/>
                {/*<Button className='w-full'>Register</Button>*/}
            </div>
        </form>
    )
}

export default Register;