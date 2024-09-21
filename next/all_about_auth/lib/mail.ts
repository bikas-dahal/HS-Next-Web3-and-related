import {Resend} from "resend";
import {string} from "zod";

const resend = new Resend(process.env.RESEND_API_KEY)


export const sendTwoFactorTokenEmail = async (
    email: string,
    token: string
) => {
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: '2FA Code',
        html: `<p> Here is your 2FA code, <b>${token}</b></p>`
    })
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const confirmLink = `http://localhost:3000/auth/new-password?token=${token}`

    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Password Reset Link',
        html: `<p> Click <a href="${confirmLink}">here</a> to reset your password</p>`
    })
}

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`

    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Verification Email',
        html: `<p>Click <a href="${confirmLink}">here</a> to verify your email address.</p>`
    })
}