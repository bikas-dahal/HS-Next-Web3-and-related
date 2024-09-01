
import Link from "next/link";
import {SubmitButton} from "@/components/common/submitBtn";
import Login from "@/components/auth/Login";

const LoginPage = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='w-[550px] bg-white rounded-xl shadow-md p-5'>
                <h1 className='text-3xl text-center bg-gradient-to-r from-pink-500 to-purple-700 text-transparent bg-clip-text font-bold'>Kook</h1>
                <h1 className='text-xl font-bold'>Login</h1>
                    <Login />
                <div className='m-2'>
                    Don't have an account? <Link href='/register'  className='font-bold '><SubmitButton  text={'Register'} /></Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPage