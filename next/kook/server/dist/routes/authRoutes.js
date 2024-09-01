import { Router } from 'express';
import { loginSchema, registerSchema } from "../validation/authValidation.js";
import { ZodError } from "zod";
import { formatError, renderEmailEjs } from "../helper.js";
import prisma from "../config/database.js";
import bcrypt from 'bcrypt';
import { v4 as uuid4 } from 'uuid';
import { emailQueue, emailQueueName } from "../jobs/EmailJob.js";
import jwt from 'jsonwebtoken';
import authMiddleware from "../middleware/authMiddleware.js";
const router = Router();
// Login route
router.post('/login', async (req, res) => {
    try {
        const body = req.body;
        const payload = loginSchema.parse(body);
        // email check
        let user = await prisma.user.findUnique({ where: { email: payload.email } });
        if (!user) {
            return res.status(422).json({
                errors: {
                    email: 'Email not registered'
                }
            });
        }
        // password check
        const compare = await bcrypt.compare(payload.password, user.password);
        if (!compare) {
            return res.status(422).json({
                email: 'Invalid email or password',
            });
        }
        // jwt payload
        const JWTPayload = {
            id: user.id,
            name: user.name,
            email: user.email
        };
        const token = jwt.sign(JWTPayload, process.env.SECRET_KEY, { expiresIn: '10d' });
        return res.json({
            message: "Login Successful",
            data: {
                ...JWTPayload,
                token: `Bearer ${token}`,
            }
        });
    }
    catch (error) {
        if (error instanceof ZodError) {
            const errors = formatError(error);
            return res.status(422).json({
                message: 'Invalid data',
                errors
            });
        }
    }
});
router.post('/check/credentials', async (req, res) => {
    try {
        const body = req.body;
        const payload = loginSchema.parse(body);
        // email check
        let user = await prisma.user.findUnique({ where: { email: payload.email } });
        if (!user) {
            return res.status(422).json({
                errors: {
                    email: 'Email not registered'
                }
            });
        }
        // password check
        const compare = await bcrypt.compare(payload.password, user.password);
        if (!compare) {
            return res.status(422).json({
                email: 'Invalid email or password',
            });
        }
        return res.json({
            message: "Login Successful",
            data: {}
        });
    }
    catch (error) {
        if (error instanceof ZodError) {
            const errors = formatError(error);
            return res.status(422).json({
                message: 'Invalid data',
                errors
            });
        }
    }
});
// get user
router.get('/user', authMiddleware, async (req, res) => {
    const user = req.user;
    return res.json({
        message: user
    });
});
// register route
router.post('/register', async (req, res) => {
    try {
        const body = req.body;
        const payload = registerSchema.parse(body);
        let user = await prisma.user.findUnique({ where: { email: payload.email } });
        if (user) {
            return res.status(422).json({
                errors: {
                    email: 'Email already exists',
                }
            });
        }
        // Password encryption
        const salt = await bcrypt.genSalt(10);
        payload.password = await bcrypt.hash(payload.password, salt);
        const token = await bcrypt.hash(uuid4(), salt);
        const url = `${process.env.APP_URL}/verify-email?email=${payload.email}&token=${token}`;
        // Prepare mail
        const emailBody = await renderEmailEjs('email-verify', {
            name: payload.name,
            url
        });
        // Send email
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
        if (!res.headersSent) {
            return res.json({
                message: 'Check your mail for the completion of the registration process.',
            });
        }
    }
    catch (error) {
        console.log('Error is', error);
        if (error instanceof ZodError) {
            const errors = formatError(error);
            if (!res.headersSent) {
                return res.status(422).json({
                    message: 'Invalid request',
                    errors
                });
            }
        }
        if (!res.headersSent) {
            return res.status(500).json({
                message: 'Internal error occurred'
            });
        }
    }
});
// router.post('/register', async (req:Request, res: Response) => {
//     try {
//         const body = req.body;
//         const payload =  registerSchema.parse(body)
//         let user = await prisma.user.findUnique({where: {email: payload.email}});
//
//         if (user) {
//             return res.status(422).json({
//                 errors: {
//                     email: 'Email already exists',
//                 }
//             })
//         }
//
//         // Password encryption
//         const salt = await bcrypt.genSalt(10);
//         payload.password = await bcrypt.hash(payload.password, salt);
//
//         const token = await bcrypt.hash(uuid4(), salt)
//         const url = `${process.env.APP_URL}/verify-email?email=${payload.email}&token=${token}`
//
//         // prepare mail
//         const emailBody = await renderEmailEjs('email-verify', {
//             name: payload.name,
//             url
//         })
//
//         // send email
//         await emailQueue.add(emailQueueName, {
//             to: payload.email,
//             subject: 'Kook email Verification',
//             body: emailBody
//         })
//
//         await prisma.user.create({
//             data: {
//                 email: payload.email,
//                 password: payload.password,
//                 name: payload.name,
//                 email_verify_token: token
//             }
//         })
//
//         return res.json({
//             'message': 'Check your mail for the completion of registration process.',
//         })
//
//     } catch (error) {
//         console.log('Error is', error)
//         if (error instanceof ZodError) {
//             const errors = formatError(error)
//             res.status(422).json({
//                 message: 'Invalid request', errors
//             })
//         }
//         return res.status(500).json({
//             message: "internal error occurred"
//         })
//     }
//
// })
export default router;
