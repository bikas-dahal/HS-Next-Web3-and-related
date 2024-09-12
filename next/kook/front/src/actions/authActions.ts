'use server'

import axios, {AxiosError} from "axios";
import {BASE_URL, CHECK_CREDENTIALS_URL, LOGIN_URL, REGISTER_URL} from "@/lib/apiEndPoints";
import {toast} from "sonner";

export async function registerAction(prevState:any, formData:FormData) {
        // console.log(formData)
    try {
        //     const ll = await axios.get(REGISTER_URL)
        // console.log(ll)
        await axios.post(REGISTER_URL, {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirm_password: formData.get('confirm_password'),
        });
        // console.log(formData)

        return {

            status: 200,
            message: "Register successfully, please verify your email",
            errors: {}
        }
    } catch (error) {

            if ( error instanceof AxiosError ) {
                if (error.response?.status === 422) {
                    return {
                        status: 422,
                        message: error.response?.data?.message,
                        errors: error.response?.data?.errors
                    }
                }
                console.log(error)
            }
        return {
            status: 500,
            message: 'Internal from front end side,  error occurred',
            errors: {}
        }
    }
}


export async function loginAction(prevState:any, formData:FormData) {
    // console.log(formData)
    try {
        //     const ll = await axios.get(REGISTER_URL)
        // console.log(ll)
        await axios.post(CHECK_CREDENTIALS_URL, {
            email: formData.get('email'),
            password: formData.get('password'),
        });
        // console.log(formData)

        return {

            status: 200,
            message: "Logging in...",
            errors: {},
            data: {
                email: formData.get('email'),
                password: formData.get('password'),
            }
        }
    } catch (error) {

        if ( error instanceof AxiosError ) {
            if (error.response?.status === 422) {
                return {
                    status: 422,
                    message: error.response?.data?.message,
                    errors: error.response?.data?.errors,
                    data: {}
                }
            }
            console.log(error)
        }
        return {
            status: 500,
            message: 'Internal from front end side,  error occurred',
            errors: {},
            data: {}
        }
    }
}