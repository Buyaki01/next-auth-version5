"use client"

import axios from "axios"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { BeatLoader } from "react-spinners"

const NewVerificationForm = () => {
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setLoading(false)
        toast.error("Missing token!")
        return
      }
  
      try {
        const response = await axios.get(`/api/new-verification?token=${token}`)

        console.log("This is the response client side new verification form: ", response)

        if (response.data.message === "Token does not exist!") {
          toast.error("Token does not exist!")
          return
        }

        if (response.data.message === "Token has expired!") {
          toast.error("Token has expired!")
          return
        }

        if (response.data.message === "Email does not exist!") {
          toast.error("Email does not exist!")
          return
        }

        setLoading(false)

        // console.log(
        //   "This is the response data updated user from new verification form client side: ",
        //   response.data.updatedUser
        // )
      } catch (error) {
        toast.error("Error while confirming verification")
      }
    }

    fetchData()
  }, [token])

  return (
    <div className="bg-lime-500 min-h-screen flex flex-col justify-center items-center">
      <div className="border border-slate-300 border-4 py-5 px-10">
        <h2 className="font-bold text-2xl text-white">Confirming your verification</h2>
        <div className="my-8 flex justify-center">
          {loading ? <BeatLoader /> : null} {/* Replace null with either a success or error message from the response data */}
        </div>
        <div className="flex justify-center">
          <button className="mt-5 text-center px-4 py-2">
            <Link href={'/auth/login'}>
              Back to Login
            </Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewVerificationForm