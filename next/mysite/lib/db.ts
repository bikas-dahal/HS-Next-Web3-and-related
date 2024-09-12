// lib/db.ts
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // Adjust based on your SSL requirements
    },
});

export const query = async (text: string, params?: any[]) => {
    const res = await pool.query(text, params);
    return res;
};
