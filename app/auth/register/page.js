'use client'

import { useState } from "react"
import { FaGithub, FaGoogle } from "react-icons/fa"
import Link from "next/link"
import toast from "react-hot-toast"
import axios from "axios"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"

const RegisterPage = () => {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const router = useRouter()

  const handleRegisterUser = async (e) => {
    e.preventDefault()

    try {
      const resUserExists = await axios.post("/api/auth/register/check-register-user-exists", { email })

      const { user } = await resUserExists.data

      if (user) {
        toast.error("Email already exists")
        return
      }

      const response = await axios.post('/api/auth/register', { name, email, password })
      
      toast.success("Confirmation Email sent!")

      // if(response.data.user) {
      //   toast.success("Account created successfully")
      //   router.push('/auth/login')
      // }

    } catch (error) {
      console.log("Error during registration: ", error)
    }
  }

  const onClick = (provider) => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT
    })
  }

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="w-[600px] p-2 shadow-2xl shadow-rose-300">
        <h1 className="my-5 font-bold text-2xl text-center">Register</h1>
        <form>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="off"
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="off"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="off"
          />

          <button
            className="w-full text-white px-4 py-2"
            onClick={handleRegisterUser}
          >
            Register
          </button>
        </form>

        <span className="text-sm font-bold flex justify-center mt-3"> or </span>

        <div className="flex gap-3 justify-center my-3">
          <button
            onClick={() => onClick("google")}
            className="px-4 py-2 text-white border border-2 border-slate-400"
          >
            <FaGoogle className="text-2xl"/>
          </button>

          <button
            onClick={() => onClick("github")}
            className="px-4 py-2 text-white border border-2 border-slate-400"
          >
            <FaGithub className="text-2xl"/>
          </button>
        </div>

        <p className="text-sm mt-3 text-center">
          Have an account? <Link className="underline" href={"/auth/login"}>Log In</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
