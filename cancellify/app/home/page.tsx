"use client"

import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Link href="/createevent"><button>Create an Event</button></Link>
        <Link href="/myevents"><button>My Events</button></Link>
      </div>

      <div>
        <Link href="/deleteaccount"><button>Delete Account?</button></Link>
      </div>
    </main>
  )
}