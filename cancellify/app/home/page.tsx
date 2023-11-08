"use client"

import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-violet-800  text-amber-300 body-font font-poppins">
      <div>
        <Link className="flex justify-center bg-emerald-800 rounded hover:bg-fuchsia-700 shadow-md w-fit p-2 text-xl shadow-2xl shadow-cyan-500/50" href="/createevent"><button>Create an Event</button></Link>
        </div>
        <br/>
        <div>
        <Link className="flex justify-center bg-emerald-800 rounded hover:bg-fuchsia-700 shadow-md w-fit p-2 text-xl shadow-2xl shadow-cyan-500/50" href="/myevents"><button>Got to my events</button></Link>
        </div>
        <br/>
      <div>
        <Link  className="flex justify-center bg-emerald-800 rounded hover:bg-fuchsia-700 shadow-md w-fit p-2 text-xl shadow-2xl shadow-cyan-500/50"href="/deleteaccount"><button>Delete Account?</button></Link>
      </div>
    </main>
  )
}