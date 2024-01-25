import { NextResponse } from "next/server"
import connectMongoDB from "@/lib/mongoose"
import { v4 as uuidv4 } from "uuid"
import VerificationToken from "@/models/verificationToken"

export const POST = async (request) => {
  const { email } = await request.json()
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000 )
  
  connectMongoDB()
  const existingToken = await VerificationToken.findOne({ email })

  if (existingToken) {
    await VerificationToken.deleteOne({ _id: existingToken._id })
  }

  const verificationToken = await VerificationToken.create({
    email: email,
    token: token,
    expires: expires,
  })
  
  return NextResponse.json({ verificationToken }, { status: 201 })
}