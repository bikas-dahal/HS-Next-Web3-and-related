import { NextRequest,NextResponse } from "next/server";
import {getToken } from "next-auth/jwt";

export { default } from 'next-auth/middleware'
//
export async function middleware(req: NextRequest) {
    const token = await getToken({req})
    const url = req.nextUrl

    if (token && (
        url.pathname.startsWith('/login') ||
        url.pathname.startsWith('/sign-up') ||
        url.pathname.startsWith('/verify') ||
        url.pathname.startsWith('/')
    )) {

        return NextResponse.redirect(new URL('/blog', req.url))
    }
    if (!token && url.pathname.startsWith('/blog')) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    return NextResponse.next()

}
    export const config = {
        matcher: ['/login', '/sign-up', '/', '/dashboard/:path*','/blog', '/verify/:path*']
    }

