import { NextApiRequest, NextApiResponse } from 'next';
import * as z from 'zod';
import { LoginSchema } from '@/schemas';
import { signIn } from '@/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const parsed = LoginSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({ error: 'Invalid login credentials' });
    }

    const { email, password } = parsed.data;

    try {
        // Handle login logic with next-auth or any authentication mechanism
        await signIn('credentials', {
            email,
            password,
            redirect: false,  // Don't redirect from API
        });

        return res.status(200).json({ success: 'Login successful' });
    } catch (error) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
}
