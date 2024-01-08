import { NextResponse } from "next/server"
import connectMongoDB from "@/lib/mongoose"
import User from "../../../models/user"

export const POST = async (request) => {
  try {
    const { email } = await request.json()

    await connectMongoDB()

    const user = await User.findOne({ email }).select("_id") //Find a user in the database based on the provided email and select only the "_id" field

    return NextResponse.json({ user })
  } catch (error) {
    console.log(error)
  }
}