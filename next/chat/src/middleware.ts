import { NextResponse } from 'next/server';
import { auth } from './auth';
import { authRoutes, publicRoutes } from './routes';

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isPublic = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isPublic) {
        return NextResponse.next();
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL('/members', nextUrl))
        }
        return NextResponse.next();
    }

    if (!isPublic && !isLoggedIn) {
        return NextResponse.redirect(new URL('/login', nextUrl))
    }

    return NextResponse.next();
})

/**
 * This is a regular expression that will match any URL path
 * that does not start with /api, /_next/static, /_next/image, or favicon.ico.
 */
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}