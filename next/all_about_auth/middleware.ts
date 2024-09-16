import authConfig from "@/auth.config";
import NextAuth from "next-auth";

// check
import {
    DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes
} from '@/routes'

const { auth } = NextAuth(authConfig)

export default auth((req) => {

    const { nextUrl } = req;


    const isLoggedIn = !!req.auth

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const ispublicRoutes = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoutes = authRoutes.includes(nextUrl.pathname);
    console.log(isLoggedIn)
    console.log('check', req.nextUrl.pathname);
})

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ]
}