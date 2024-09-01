import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {registerAction} from "@/actions/authActions";
import {SubmitButton} from "@/components/common/submitBtn";
import Register from "@/components/auth/Register";

const RegisterPage = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='w-[550px] bg-white rounded-xl shadow-md p-5'>
                <h1 className='text-3xl text-center bg-gradient-to-r from-pink-500 to-purple-700 text-transparent bg-clip-text font-bold'>Kook</h1>
                <h1 className='text-xl font-bold'>Register</h1>
                <Register />
                <div className='m-2'>
                    Already have an account? <Button className='h-8 m-0 p-2' variant='outline'><Link href='/login'
                                                                                                     className='font-bold '>Login</Link></Button>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage