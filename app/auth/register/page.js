'use client'

import { useState } from "react"
import { FaGoogle } from "react-icons/fa"
import Link from "next/link"
import toast from "react-hot-toast"
import axios from "axios"
import { useRouter } from "next/navigation"

const RegisterPage = () => {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const router = useRouter()

  const handleRegisterUser = async (e) => {
    e.preventDefault()

    try {
      console.log("This is the register email: ", email)
      const resUserExists = await axios.post("/api/auth/register/check-register-user-exists", { email })

      const { user } = await resUserExists.data

      if (user) {
        toast.error("Email already exists")
        return
      }

      const response = await axios.post('/api/auth/register', { name, email, password })
      console.log("This is the response data: ", response.data)

      if(response.data.user) {
        toast.success("Account created successfully")
        router.push('/auth/login')
      }

    } catch (error) {
      console.log("Error during registration: ", error)
    }
  }

  return (
    <div className="min-h-screen">
      <h1 className="my-5 font-bold text-center text-2xl">Register</h1>
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

      <span className="text-sm font-bold flex justify-center mt-3">or</span>

      <div className="flex border border-slate-500 border-2 justify-center items-center gap-2 px-6 py-2 mt-3">
        <FaGoogle /> Login with Google
      </div>

      <p className="text-sm mt-3">
        Have an account? <Link className="underline" href={"/auth/login"}>Log In</Link>
      </p>
    </div>
  )
}

export default RegisterPage
