"use client"

import Link from "next/link"
import { BeatLoader } from "react-spinners"

const NewVerificationForm = () => {
  return (
    <div className="bg-lime-500 min-h-screen flex flex-col justify-center items-center">
      <div className="border border-slate-300 border-4 py-5 px-10">
        <h2 className="font-bold text-2xl text-white">Confirming your verification</h2>
        <div className="my-8 flex justify-center">
          <BeatLoader />
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