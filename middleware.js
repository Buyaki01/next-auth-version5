import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { 
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes
 } from "./routes"

const { auth } = NextAuth(authConfig)

export default auth((req) => { //This is where you decide/describe what you want to do with the routes that you specified below.
  const isLoggedIn = !!req.auth
  const { nextUrl } = req

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) {
    return null; //Simply means do not do any action regarding this
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl)) //Have to include nextUrl so it creates an absolute URL. 
      //This is not an absolute URL but when you combine it with a second parameter which is nextUrl, it creates it into http://localhost:3000/settings...
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl))
  }

  return null
})

export const config = { //matcher for anything you want to invoke the middleware.
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'], //This regular expression invokes the middleware on every single thing except specific next static files and next images.
}