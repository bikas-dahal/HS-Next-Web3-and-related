import { query } from '@/lib/db';

export type UserType = {
    id: number;
    name: string;
    email: string | undefined;
    password?: string;
    googleId?: string | undefined;
    image?: string;
};

export const createUser = async (user: Omit<UserType, 'id'>) => {
    const { name, email, password, googleId, image } = user;
    const { rows } = await query(
        'INSERT INTO users (name, email, password, google_id, image) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, email, password, googleId, image]
    );
    return rows[0];
};

export const findUserByEmail = async (email: string) => {
    const { rows } = await query('SELECT * FROM users WHERE email = $1', [email]);
    return rows[0];
};

export const findUserById = async (id: number) => {
    const { rows } = await query('SELECT * FROM users WHERE id = $1', [id]);
    return rows[0];
};