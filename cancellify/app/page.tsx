import Link from "next/link"

export default function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        Cancellify
      </div>
      <div>
        <Link href="/login"><button>Login</button></Link>
        <Link href="/register"><button>Register</button></Link>
      </div>
    </main>
  )
}
