import { NextResponse } from "next/server"
import connectMongoDB from "@/lib/mongoose"
import VerificationToken from "@/models/verificationToken"
import User from "@/models/user"

export const POST = async (request) => {
  const { token } = await request.json()

  try {
    connectMongoDB()
    const existingToken = await VerificationToken.findOne({ token })
    console.log("This is the existingToken from the existingToken POST route: ", existingToken)

    if(!existingToken) {
      return NextResponse.json({ message: "Token does not exist!" }, { status: 404 })
    }

    const hasExpired = new Date(existingToken.expires) < new Date()

    if (hasExpired) {
      return NextResponse.json({ message: "Token has expired!" }, { status: 401 })
    }

    const existingUser = await User.findOne({ email: existingToken.email})

    console.log("This is the existing user from new-verification POST route: ", existingUser)

    if (!existingUser) {
      return NextResponse.json({ message: "Email does not exist!" }, { status: 404})
    }

    const updatedUser = await User.findByIdAndUpdate(
      {_id: existingUser._id}, 
      { emailVerified: new Date(), email: existingToken.email }, 
      { new: true })
    
    console.log("User updated successfully: ", updatedUser)

    await VerificationToken.deleteOne({ _id: existingToken._id })

    return NextResponse.json({ message: "Email verified successfully!" })
    
  } catch (error) {
    console.error("Error in POST route:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}