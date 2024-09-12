interface AuthUser {
    email: string;
    name: string;
    id: number;
}

declare namespace Express {
    export interface Request {
        user?: AuthUser
    }
}