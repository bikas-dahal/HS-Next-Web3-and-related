import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const RegisterPage = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='w-[550px] bg-white rounded-xl shadow-md p-5'>
                <h1 className='text-3xl text-center bg-gradient-to-r from-pink-500 to-purple-700 text-transparent bg-clip-text font-bold'>Kook</h1>
                <h1 className='text-xl font-bold'>Register</h1>
                <form>
                    <div className='mt-3'>
                        <Label htmlFor='name'>Name</Label>
                        <Input id='name' type='text' name='name' placeholder='Enter your name...'/>
                    </div>
                    <div className='mt-3'>
                        <Label htmlFor='email'>Email</Label>
                        <Input id='email' type='email' name='email' placeholder='Enter your email...'/>
                    </div>
                    <div className='mt-3'>
                        <Label htmlFor='password'>Password</Label>
                        <Input id='password' name='password' type='password' placeholder='Password here...'/>
                    </div>
                    <div className='mt-3'>
                        <Label htmlFor='cpassword'>Confirm Password</Label>
                        <Input id='cpassword' name='confirm_password' type='password' placeholder='Please your password again...'/>
                    </div>
                    <div className='text-right m-2'>

                        {/*<Link href='/forgot-password' className='bg-slate-100 hover:text-sky-900 hover:bg-white m-2 rounded p-1'>Forget Password?</Link>*/}
                    </div>
                    <div className='mt-3'>
                        <Button className='w-full'>Register</Button>
                    </div>
                </form>
                <div className='m-2'>
                    Already have an account? <Button className='h-8 m-0 p-2' variant='outline'><Link href='/login'
                                                                                                     className='font-bold '>Login</Link></Button>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage