'use client'

import { useState } from "react"
import { FaGoogle } from "react-icons/fa"
import Link from "next/link"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"
import { signIn } from "next-auth/react"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      console.log("This is the login email: ", email)
      console.log("This is the login password: ", password)
      
      if (!email || !password) {
        toast.error("All Fields are required!")
      }
      
      const response = await signIn("credentials", {
        email,
        password,
        redirectTo: DEFAULT_LOGIN_REDIRECT //in future add callback url to it
      })

      if(response.status === 200 ) {
        toast.success("Login successful")
        router.back()
      }

      if (response.status === 401) {
        toast.error("Invalid Credentials! Try again!")
        return
      }
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { error: "Invalid credentials!" }
          default:
            return { error: "Something went wrong!" }
        }
      }
      throw error //You have to add throw error otherwise user will not be redirected to the next page after logging in, in my case, the settings page
    }
  }

  return (
    <div className="min-h-screen">
      <h1 className="my-5 font-bold text-center text-2xl">Login</h1>
      <form>
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
          onClick={handleLogin}
        >
          Log In
        </button>
      </form>

      <span className="text-sm font-bold flex justify-center mt-3">or</span>

      <div className="flex border border-slate-500 border-2 justify-center items-center gap-2 px-6 py-2 mt-3">
        <FaGoogle /> Login with Google
      </div>

      <p className="text-sm mt-3">
        Have no account? <Link className="underline" href={"/auth/register"}>Sign Up</Link>
      </p>
    </div>
  )
}

export default LoginPage
