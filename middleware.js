import { auth } from "./auth"

export default auth((req) => { //This is where you decide/describe what you want to do with the routes that you specified below.
  const isLoggedIn = !!req.auth
  console.log("ROUTE with /auth/login: ", req.nextUrl.pathname)
  console.log("IS LOGGEDIN: ", isLoggedIn)
})

export const config = { //matcher for anything you want to invoke the middleware.
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'], //This regular expression invokes the middleware on every single thing except specific next static files and next images.
}