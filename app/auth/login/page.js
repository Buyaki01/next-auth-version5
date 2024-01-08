import { FaGoogle } from "react-icons/fa"

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex border border-slate-500 border-2 justify-center items-center gap-2 px-6 py-2">
        <FaGoogle /> Login with Google
      </div>
    </div>
  )
}

export default LoginPage
