import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import connectMongoDB from "@/lib/mongoose"
import User from "@/models/user"
import { v4 as uuidv4 } from "uuid"
import VerificationToken from "@/models/verificationToken"

export const POST = async (request) => {
  try {
    const { name, email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required fields" },
        { status: 400 }
      )
    }
    
    const hashedPassword = await bcrypt.hash(password, 10)

    await connectMongoDB()

    const user = await User.create({ name, email, password: hashedPassword })

    const token = uuidv4()
    const expires = new Date(new Date().getTime() + 3600 * 1000 )
    
    const existingToken = await VerificationToken.findOne({ email: email })

    if (existingToken) {
      await VerificationToken.deleteOne({ _id: existingToken._id })
    }

    const verificationToken = await VerificationToken.create({
      email: email,
      token: token,
      expires: expires,
    })

    return NextResponse.json({ message: "User registered Successfully", user, verificationToken }, { status: 201 })
  } catch (error) {
    console.error("An error occurred while registering the user: ", error)
    return NextResponse.json({ message: "An error occurred while registering the user"}, { status: 500 })
  }
}