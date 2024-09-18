import authConfig from "@/auth.config";
import NextAuth from "next-auth";

// check
import {
    DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes
} from '@/routes'
import {NextRequest, NextResponse} from "next/server";

const { auth } = NextAuth(authConfig)

export default auth((req:NextRequest)=>{

    const { nextUrl } = req;

    console.log('cc', nextUrl)

    const isLoggedIn = !!req.auth


    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoutes = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
        return null
    }

    if (isAuthRoutes) {
        if (isLoggedIn) {
            return NextResponse.redirect(DEFAULT_LOGIN_REDIRECT) // to create a absolute url
        }

        return null
    }

    if (!isLoggedIn && !isPublicRoutes) {
        return NextResponse.redirect(new URL('/auth/login', nextUrl));
    }

    return null

})

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ]
}