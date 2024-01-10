import Link from "next/link"
import { IoArrowBack } from "react-icons/io5"

const AuthErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-lime-500">
      <div className="shadow-2xl bg-white p-4">
        <h2 className="font-bold text-2xl text-center mb-5">Auth</h2>
        <h4 className="text-2xl">Oops! Something went wrong!</h4>
        <div>
          <Link 
            href={"/auth/login"}
            className="flex gap-2 items-center justify-center mt-5"
          > 
            <IoArrowBack />
            <span className="hover:underline">Back to login</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AuthErrorPage