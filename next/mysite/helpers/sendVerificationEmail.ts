import {ApiResponse} from "@/types/apiResponse";
import {resend} from "@/lib/resend";
import VerificationEmail from "@/emails/verificationEmail";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string,
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'AnMessage Verification Email',
            react: VerificationEmail({username, otp:verifyCode}),
        });

        return {
            success: true,
            message: 'Verification email send successfully.'
        }
    } catch (email_error) {
        console.log('Error sending verification email', email_error);
        return {
            success: false,
            message: 'Failed to send verification mail'
        }
    }
}