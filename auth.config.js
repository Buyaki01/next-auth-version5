import Credentials from "next-auth/providers/credentials"
import User from "./models/user"
import bcrypt from 'bcryptjs'
import connectMongoDB from "./lib/mongoose"

export default {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {},

      async authorize(credentials) {
        // const { email, password, role = 'user' } = credentials
        //console.log("This is the credentials object: ", credentials)
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