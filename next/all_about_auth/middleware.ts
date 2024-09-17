import authConfig from "@/auth.config";
import NextAuth from "next-auth";

// check
import {
    DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes
} from '@/routes'

const { auth } = NextAuth(authConfig)

export default auth((req) => {

    const { nextUrl } = req;


    // console.log('cc', nextUrl)

    const isLoggedIn = !!req.auth


    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const ispublicRoutes = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoutes = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
        return null
    }

    if (isAuthRoutes) {
        if (isLoggedIn) {
            return Response.redirect(DEFAULT_LOGIN_REDIRECT) // to create a absolute url
        }

        return null
    }

    if (!isLoggedIn && !ispublicRoutes) {
        return Response.redirect(new URL('/auth/login', nextUrl));
    }

    return null

})

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ]
}