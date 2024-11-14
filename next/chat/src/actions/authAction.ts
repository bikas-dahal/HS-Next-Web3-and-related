'use server'

import {registerSchema, RegisterSchema} from "@/schema/RegisterSchema";
import bcrypt from "bcryptjs";
import {prisma} from "@/lib/prisma";
import { ActionResult } from '@/types'
import {LoginSchema} from "@/schema/LoginSchema";
import {signIn, signOut} from "@/auth";
import {AuthError} from "next-auth";
import {User} from "@prisma/client";


export async function loginUser(data: LoginSchema): Promise<ActionResult<string>> {
    try {
        const result = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false
        })

        console.log(result)

        return {
            status: 'success',
            data: 'Login successfully'
        }
    } catch (error) {
        console.log(error)

        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return {
                        status: 'error',
                        error: 'Invalid Credentials',
                    }
                default:
                    return {
                        status: 'error',
                        error: 'Something went wrong',
                    }
            }
        } else {
            return {
                status: 'error',
                error: 'Something went wrong'
            }
        }
    }
}


export async function registerUser (data: RegisterSchema): Promise<ActionResult<User>> {
    try {
        const parsedData = registerSchema.safeParse(data);

        if (!parsedData.success) {
            return {
                status: "error",
                error: parsedData.error.errors
            }
        }

        const {name, email, password} = parsedData.data;

        const existingEmail = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (existingEmail) {
            return {
                status: "error",
                error: 'User already exists'
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })

        return {
            status: "success",
            data: user
        }

    } catch (error) {
        return {
            status: "error",
            error: 'Something went wrong'
        }
    }
}

export async function getUserByEmail(email: string) {
    return prisma.user.findUnique({
        where: {
            email
        }
    })
}

export async function signOutUser () {
    await signOut({
        redirectTo: '/'
    })
}

export async function getUserById(id: string) {
    return prisma.user.findUnique({ where: { id } });
}