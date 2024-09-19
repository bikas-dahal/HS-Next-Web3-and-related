// Public routes, no routes

export const publicRoutes = [
    '/',
    '/auth/providers'
]

// Routes for auth
export const authRoutes = [
    '/auth/login',
    '/auth/register',
    '/auth/error',
]


export const apiAuthPrefix = 'api/auth';


export const DEFAULT_LOGIN_REDIRECT = 'http://localhost:3000/settings'
