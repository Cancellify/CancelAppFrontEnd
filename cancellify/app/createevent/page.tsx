"use client"
import axios from "axios";
import { error } from "console";
import Link from "next/link";
import React, {useState, useEffect, use, useContext} from "react"


export default function CreateEvents() {
  //useState
  const [friends, setFriends] = useState<any>([]);
  const [query, setQuery] = useState<string>("");
  const [queryResults, setQueryResults] = useState<any>([]);
  const [date, setDate] = useState<any>(null);
  const [time, setTime] = useState<any>(null);
  const [dateTime, setDateTime] = useState<any>(null);
  const [eventDetails, setEventDetails] = useState<string>("");
  const [eventTitle, setEventTitle] = useState<string>("");
  const [invitees, setInvitees] = useState<any>([]);
  const [creatorUsername, setCreatorUsername] = useState<any>(null)
  

  //useEffect
  useEffect(() => {
    fetchUsers();
    let usernameFromLocal:string | null = localStorage.getItem("username")
    setCreatorUsername(usernameFromLocal)
  }, [],)

  
  useEffect(()=>{
      handleQuery();
  }, [query]);


  useEffect(() => {
    if(date && time){
    setDateTime(new Date((date + " " + time)).toISOString());
    }
  }, [date, time]);


  //handler functions
  function handleDate(event :any ) {
    setDate(event.target.value);
  }

  function handleTime(event: any) {
    setTime(event.target.value);
  }

  function handleChange(event: any) {
    setQuery(event.target.value.toLowerCase());

  }

  function handleEventDetails(event: any){
    setEventDetails(event.target.value);
  }

  function handleEventTitle(event: any){
    setEventTitle(event.target.value);
  }

  function handleInvite(event:any){
    const invitedMember = event.target.getAttribute("data-key");
    if(!invitees.includes(invitedMember)){
    setInvitees((prev:[]) => [...prev, invitedMember])
    }
    setQuery("");
  }

  

  async function createEventButtion (event:any){
    const sentData = {
      eventName: eventTitle,
      eventDescription: eventDetails,
      date: dateTime,
      invitees: invitees,
      creator: creatorUsername
    }
    // const url = "http://localhost:8080/events/create";
    const url = "https://cancellify-2681bafbf4fb.herokuapp.com/events/create"
    const data = await axios.post(url, sentData).catch(error=> {
      window.alert("Event not created. make sure all fields are set")
    });
    if(data){
      window.alert("Event Created!")
    }
    
    (document.getElementById("myDate") as HTMLInputElement).value ="";
    (document.getElementById("myTime") as HTMLInputElement).value ="";
    

    setEventTitle("");
    setEventDetails("");
    setDate(null);
    setTime(null);
    setDateTime(null)
    setInvitees([])
  }
 
  function handleQuery() {
    let results = friends.filter((friend: any) => friend.username.toLowerCase().includes(query) || friend.first_name.toLowerCase().includes(query) || friend.last_name.toLowerCase().includes(query))
    setQueryResults(results)
  }

  function removeInvitee(event:any) {
    const user = event.target.innerText;
    setInvitees((prev:[]) => (prev.filter(uninvite => uninvite !== user )));
  }

 

  async function fetchUsers(){
    // const url = "http://localhost:8080/accounts/all";
    const url = "https://cancellify-2681bafbf4fb.herokuapp.com/accounts/all"
    let response:any ; 
    response = await axios.get(url)
    setFriends(response.data)
  
}

    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-violet-800  text-amber-300 body-font font-poppins">
        <h1 className="p-2">Event Creator : {creatorUsername}</h1>       
       <div>
       <div className="flex items-center justify-center p-2 bg-violet-800  text-amber-300 body-font font-poppins">Event Name</div>
        <input className="bg-emerald-800 rounded rounded-r-none p-2 w-32" id="myDate" type="date"  required onChange={handleDate}></input>
        <input className="bg-emerald-800 rounded rounded-l-none p-2 w-32"type="time" id="myTime"  required onChange={handleTime}/>
        <div className="flex items-center justify-center p-2 bg-violet-800  text-amber-300 body-font font-poppins">Event Name</div>
        <input className="bg-emerald-800 rounded p-2 w-64" type="text" value={eventTitle} required onChange={handleEventTitle}></input>
        <div className="flex items-center justify-center">Event Description</div>
        <div className="flex items-center justify-center mb-1.5">
        <textarea className="flex items-center justify-center bg-emerald-800 p-1 rounded resize-vertical mb-1.5 overflow-hidden" required value= {eventDetails} onChange={handleEventDetails}></textarea>
        </div>
        <div>
          
        {invitees.length !==0 &&(<div className="flex-col items-center justify-center  bg-violet-800  text-amber-300 body-font font-poppins">
          <h1 className="flex items-center justify-center p-2 bg-violet-800  text-amber-300 body-font font-poppins">Invitees List</h1>
          <ul className="flex items-center justify-center p-2 bg-violet-800  text-amber-300 body-font font-poppins">{invitees.map((username:string, index: number) => 
          <li className="flex items-center justify-center p-2 bg-violet-800  text-amber-300 body-font font-poppins" onClick={removeInvitee} a-key={index} key={index}>{username}</li>)}</ul></div>)
       }
       </div>
        <div className="flex justify-center">
          <button className="flex justify-center bg-emerald-800 rounded hover:bg-fuchsia-700 shadow-md w-fit p-2 mb-1.5" onClick={createEventButtion}>Everything Ready?</button>
        </div>
       </div>
       <div>
       {query.length !==0 &&(<div><ul>{queryResults.map((result:any, index: number) => <li key={index} data-key={result.username}
       onClick={handleInvite}>{result.username} {result.first_name} {result.last_name}</li>)}</ul></div>)
       }
      <div><input className="bg-emerald-800 rounded p-2 w-64 mt-1.5" type="text" value={query} onChange={handleChange}></input></div>
      <div className="flex justify-center p-2">
      <button className="flex justify-center bg-emerald-800 rounded hover:bg-fuchsia-700 shadow-md w-fit p-1" onClick={handleChange}>Search</button>
      </div>
      </div>
      <div className="flex justify-center">
      <Link className="flex justify-center bg-emerald-800 rounded hover:bg-fuchsia-700 shadow-md w-fit p-1 mr-1.5" href="/home"><button>Back to Home?</button></Link>
      <Link  className="flex justify-center bg-emerald-800 rounded hover:bg-fuchsia-700 shadow-md w-fit p-1" href="/myevents"><button>To my events</button></Link>
      </div>
      </main>
    )
  }