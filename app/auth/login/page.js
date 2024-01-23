'use client'

import { useEffect, useState } from "react"
import { FaGithub, FaGoogle } from "react-icons/fa"
import Link from "next/link"
import toast from "react-hot-toast"
import { useSearchParams } from "next/navigation"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"
import { signIn } from "next-auth/react"
import axios from "axios"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get("error") === "OAuthAccountNotLinked") {
      toast.error("Email already in use with a different provider!")
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      if (!email || !password) {
        toast.error("All Fields are required!")
      }

      const existingUser = await axios.post('/api/auth/register/check-register-user-exists', { email })

      if (!existingUser || !existingUser.data.user.email || !existingUser.data.user.password) {
        toast.error("Email does not exist!")
        return { error: "Email does not exist!" }
      }

      // if (!existingUser.data.user.emailVerified) {
      //   toast.error("Please check your email address to verify your email first!")
      //   const verificationToken = await axios.post('api/tokens/login-verification-token', existingUser.email )
      //   console.log("This is the verificationToken from the login page: ", verificationToken)
      // }
      
      const response = await signIn("credentials", {
        email,
        password,
        redirectTo: DEFAULT_LOGIN_REDIRECT //in future add callback url to it
      })

      if (response.status === 401) {
        toast.error("Invalid Credentials! Try again!")
        return
      }

      setLoading(false)
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

  const onClick = (provider) => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT
    })
  }

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="w-[600px] p-2 shadow-2xl shadow-rose-300">
        <h1 className="my-5 font-bold text-2xl text-center">Login</h1>
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
            disabled={loading}
          >
            Log In
          </button>
        </form>

        <span className="text-sm font-bold flex justify-center mt-3">or</span>

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
          Have no account? <Link className="underline" href={"/auth/register"}>Sign Up</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
