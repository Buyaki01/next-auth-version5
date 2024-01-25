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
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  events: {
    async linkAccount({user}) { //linkAccount is used to Update the emailVerified field from null to the new Date() whenever user uses OAuth of trusted providers like Google and Github
      await connectMongoDB()
      await User.findByIdAndUpdate(
        { _id: user.id },
        { emailVerified: new Date() },
        { new: true }
      )
    }
  },

  callbacks: {
    async signIn({ user, account }) { //signIn callback is used to prevent sign in without email verification.
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true
      
      await connectMongoDB()
      const existingUser = await User.findOne({ _id: user.id })
      
      //Prevent sign in without email verification
      // if (!existingUser?.emailVerified) return false

      return true
    },
    
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
