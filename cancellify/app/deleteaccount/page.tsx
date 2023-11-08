"use client"
import { useState, useEffect } from "react"
import axios from "axios";
import { useRouter } from 'next/navigation';

export default function DeleteAccount() {
  const [username, setUsername] = useState<null | string>(null);
  const [password, setPassword] = useState<null | string>(null);
  const [statusCode, setStatusCode] = useState<number| null>(null);
  
  const router = useRouter();
  useEffect(() => {
    if(statusCode === 200){
      router.push("/")
    }       
}, [statusCode, router])

useEffect(() =>{
  if (username && password){
  sendDelete()
  }
},[username, password])
  

function handleDelete(){
setUsername((document.getElementById("username") as HTMLInputElement).value);
setPassword((document.getElementById("password") as HTMLInputElement).value);

}

async function sendDelete(){
  const userData = {
    username: username,
    password: password
  }
  const url = "http://localhost:8080/accounts/delete";
// const url = "https://cancellify-2681bafbf4fb.herokuapp.com/accounts/delete"
  const data = await axios.post(url, userData).catch(error=> {
    window.alert("Account Not Deleted")
    
  });
  if(data){
    window.alert(data.data)
    setStatusCode(data.status)
  }

}

    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-violet-800  text-amber-300 body-font font-poppins">   
       <div className="text-xl">Are you sure? We will miss you like we did at all those events</div>
       <div  className="flex items-center justify-center p-2 bg-violet-800  text-amber-300 body-font font-poppins">Username</div>
       <input id="username" className="bg-emerald-800 rounded p-2 w-64" type="text" ></input>
        <div className="flex items-center justify-center p-2 bg-violet-800  text-amber-300 body-font font-poppins ">Password</div>
        <input id="password" className="bg-emerald-800 rounded p-2 w-64 mb-3" type="password" ></input>
      
        <button className="flex justify-center bg-emerald-800 rounded hover:bg-fuchsia-700 shadow-md w-fit p-1 mr-1.5 shadow-2xl shadow-cyan-500/50" onClick={handleDelete}>Delete Account</button>
        
      </main>
    )
  }