import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "./lib/mongodb"
import connectMongoDB from "./lib/mongoose"
import User from "./models/user"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    // async signIn({ user }) {//when user logs out, there is a field called emailVerified which becomes null, in that case when email is not verified, that user should not be allowed to/ blocked from signIn
    //   console.log("This is the user in signIn method: ", user)
    //   await connectMongoDB()
    //   const existingUser = await User.findOne({ _id: user.id })

    //   if (!existingUser || !existingUser.emailVerified) {
    //     return false
    //   }
    // },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role
      }
      return session
    },

    async jwt({ token }) {
      // sub is the id of the user in the user table/model
      if (!token.sub) return token

      await connectMongoDB()
      const existingUser = await User.findOne({ _id: token.sub }) //gets the user from the database using the id,sub
      
      if (!existingUser) return token

      token.role = existingUser.role //You first set the fields that you want in the token and then pass them to the session above, that is the flow

      return token
    }
  },
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt" },
  ...authConfig
})

//Callbacks are important when you want to trigger next-auth actions like: sign in, authorized, sign out, redirect...etc
