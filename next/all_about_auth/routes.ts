// Public routes, no routes

export const publicRoutes = [
    '/',
    '/auth/providers',
    '/auth/new-verification',
]

// Routes for auth
export const authRoutes = [
    '/auth/login',
    '/auth/register',
    '/auth/error',
    '/auth/reset',
    '/auth/new-password',

]


export const apiAuthPrefix = 'api/auth';


export const DEFAULT_LOGIN_REDIRECT = 'http://localhost:3000/settings'
