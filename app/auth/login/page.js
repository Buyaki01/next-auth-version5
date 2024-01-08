'use client'

import { useState } from "react"
import { FaGoogle } from "react-icons/fa"
import Link from "next/link"

const LoginPage = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleLogin = () => {
    console.log("Login function")
  }

  return (
    <div className="min-h-screen">
      <h1 className="my-5 font-bold text-center text-2xl">Login</h1>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button
        className="w-full text-white px-4 py-2"
        onClick={handleLogin}
      >
        Log In
      </button>

      <span className="text-sm font-bold flex justify-center mt-3">or</span>

      <div className="flex border border-slate-500 border-2 justify-center items-center gap-2 px-6 py-2 mt-3">
        <FaGoogle /> Login with Google
      </div>

      <p className="text-sm mt-3">
        Have no account? <Link className="underline" href={"/register"}>Sign Up</Link>
      </p>
    </div>
  )
}

export default LoginPage
