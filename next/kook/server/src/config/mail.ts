import nodemailer from 'nodemailer'

export const transport = nodemailer.createTransport({
    service: 'gmail',

    // host: process.env.SMTP_HOST,
    // secure: false,
    // port: 587,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
})

export const sendEmail = async (to: string, subject: string, body: string) => {
    await transport.sendMail({
        from: process.env.EMAIL_FROM,
        to: to,
        subject: subject,
        html: body
    })
}