import Credentials from "next-auth/providers/credentials"
import Google from 'next-auth/providers/google'
import Github from 'next-auth/providers/github'
import User from "./models/user"
import bcrypt from 'bcryptjs'
import connectMongoDB from "./lib/mongoose"

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),

    Credentials({
      name: 'Credentials',
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials
        try {
          await connectMongoDB()
          const user = await User.findOne({ email })
          
          if (!user) {
            return null
          }

          const passwordMatch = await bcrypt.compare(password, user.password)

          if (!passwordMatch) {
            return null
          }

          return user

        } catch (error) {
          console.log("Error: ", error)
          throw error
        }
      }
    })
  ],
} 