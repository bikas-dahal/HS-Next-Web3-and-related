'use client'

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import {SubmitButton} from "@/components/common/submitBtn";
import {useFormState} from "react-dom";
import {loginAction, registerAction} from "@/actions/authActions";
import {toast} from "sonner";
import {useEffect} from "react";
import {signIn} from "next-auth/react";

const Login = () => {

    const initState = {
        status: 0,
        message: '',
        errors: {},
        data: {}
    }

    const [state, formAction] = useFormState(loginAction, initState)

    useEffect(() => {
        if ( state.status === 500 ) {
            toast.error(state.message)
        } else if (state.status === 200) {
            toast.success(state.message);
            signIn('credentials', {
                email: state.data?.email,
                password: state.data?.password,
                redirect: true,
                callbackUrl: '/dashboard'
            })
        }
    }, [state])

    return (
        <form action={formAction}>
            <div className='mt-3'>
                <Label htmlFor='email'>Email</Label>
                <Input id='email' type='email' name='email' placeholder='Enter your email...'/>
                <span className='text-red-500'>{state.errors?.email}</span>
            </div>
            <div className='mt-3'>
                <Label htmlFor='password'>Password</Label>
                <Input id='password' name='password' type='password' placeholder='Password here...'/>
                <span className='text-red-500'>{state.errors?.password}</span>

            </div>
            <div className='text-right m-2'>

                <Link href='/forgot-password'
                      className='bg-slate-100 hover:text-sky-900 hover:bg-white m-2 rounded p-1'>Forget Password?</Link>
            </div>
            <div className='mt-3'>
                <SubmitButton text={'Login'} />
            </div>
        </form>
    )
}

export default Login;