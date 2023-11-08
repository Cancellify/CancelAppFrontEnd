import Link from "next/link"


export default function App({}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-violet-800  text-amber-300 body-font font-poppins">
      <div className="text-9xl">
        Cancellify
      </div>
      <br/>
      <br/>
      <br/>
      <div>
        <Link className="flex justify-center bg-emerald-800 rounded hover:bg-fuchsia-700 shadow-md w-fit p-1 text-xl" href="/login"><button>Login</button></Link>
        </div>
        <br/>
        <div>
        <Link className="flex justify-center bg-emerald-800 rounded hover:bg-fuchsia-700 shadow-md w-fit p-1 text-xl" href="/register"><button>Register</button></Link>
      </div>
    </main>
  )
}
