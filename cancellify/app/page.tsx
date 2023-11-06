import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        Canceled
      </div>
      <div>
        <Link href="/login"><button>Login</button></Link>
        <Link href="/register"><button>Register</button></Link>
      </div>
    </main>
  )
}
