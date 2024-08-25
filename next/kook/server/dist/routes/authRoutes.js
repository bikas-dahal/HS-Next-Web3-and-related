import { Router } from 'express';
import { registerSchema } from "../validation/authValidation.js";
import { ZodError } from "zod";
import { formatError, renderEmailEjs } from "../helper.js";
import prisma from "../config/database.js";
import bcrypt from 'bcrypt';
import { v4 as uuid4 } from 'uuid';
import { emailQueue, emailQueueName } from "../jobs/EmailJob.js";
const router = Router();
// register route
router.post('/register', async (req, res) => {
    try {
        const body = req.body;
        const payload = registerSchema.parse(body);
        let user = await prisma.user.findUnique({ where: { email: payload.email } });
        if (user)
            return res.status(422).json({
                errors: {
                    email: 'Email already exists',
                }
            });
        // Password encryption
        const salt = await bcrypt.genSalt(10);
        payload.password = await bcrypt.hash(payload.password, salt);
        const token = await bcrypt.hash(uuid4(), salt);
        const url = `${process.env.APP_URL}/verify-email?email=${payload.email}&token=${token}`;
        // prepare mail
        const emailBody = await renderEmailEjs('email-verify', {
            name: payload.name,
            url
        });
        // send email
        await emailQueue.add(emailQueueName, {
            to: payload.email,
            subject: 'Kook email Verification',
            body: emailBody
        });
        await prisma.user.create({
            data: {
                email: payload.email,
                password: payload.password,
                name: payload.name,
                email_verify_token: token
            }
        });
        return res.json({
            'message': 'Check your mail for the completion of registration process.',
        });
    }
    catch (error) {
        console.log('Error is', error);
        if (error instanceof ZodError) {
            const errors = formatError(error);
            res.status(422).json({
                message: 'Invalid request', errors
            });
        }
        return res.status(500).json({
            message: "internal error occurred"
        });
    }
});
export default router;
