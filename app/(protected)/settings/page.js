import { auth, signOut } from "@/auth"

const SettingsPage = async () => {
  const session = await auth()

  return (
    <div>
      {JSON.stringify(session)}

      <form 
        action={async () => {
          "use server"
          await signOut()
        }}
      >
        <button type="submit" className="px-4 py-2 bg-lime-500 text-white my-3">
          Sign out
        </button>
      </form>
    </div>
  )
}

export default SettingsPage
