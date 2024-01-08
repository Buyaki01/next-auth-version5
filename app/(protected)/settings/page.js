import { auth } from "@/auth"
// import { signOut } from "next-auth/react"

const SettingsPage = async () => {
  const session = await auth()

  // const handleLogout = async () => {
  //   await signOut()
  // }

  return (
    <div>
      {JSON.stringify(session)}

      <form className="m-3">
        <button
          className="px-4 py-2 text-white"
        >
          Log out
        </button>
      </form>
    </div>
  )
}

export default SettingsPage
