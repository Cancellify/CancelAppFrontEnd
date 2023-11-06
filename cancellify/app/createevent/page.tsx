"use client"
import axios from "axios";
import React, {useState, useEffect, use, useContext} from "react"
import { userId } from "../login/page";


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
  const [creator, setCreator] =useState<string | null>(null)

  let user:string | null = useContext(userId);

  //constant
  let inviteArray:[] = [];
  let continueInvite: [] = [];
  

  //useEffect
  useEffect(() => {
    fetchUsers();
    setCreator(user)
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

  async function createEventButtion (){
    const sentData = {
      eventName: eventTitle,
      eventDescription: eventDetails,
      date: dateTime,
      invitees: invitees,
      creator: creator
    }
    const url = "http://localhost:8080/events/create";
    await axios.post(url, sentData);

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

  async function fetchUsers(){
    const url = "http://localhost:8080/accounts/all";
    let response:any ; 
    response = await axios.get(url)
    setFriends(response.data)
}

    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>Event Creator : {creator}</h1>
       <div>
       <div>Event Name</div>
        <input type="date" required onChange={handleDate}></input>
        <input type="time" required onChange={handleTime}/>
        <div>Event Name</div>
        <input type="text" value={eventTitle} required onChange={handleEventTitle}></input>
        <div>Event Description</div>
        <textarea required value= {eventDetails} onChange={handleEventDetails}></textarea>
        <div>
          <h1>Invitees</h1>
        {invitees.length !==0 &&(<div><ul>{invitees.map((username:string, index: number) => <li key={index}>{username}</li>)}</ul></div>)
       }
       </div>
        <div>
          <button onClick={createEventButtion}>Everything Ready?</button>
        </div>
       </div>
       <div>
       {query.length !==0 &&(<div><ul>{queryResults.map((result:any, index: number) => <li key={index} data-key={result.username}
       onClick={handleInvite}>{result.username} {result.first_name} {result.last_name}</li>)}</ul></div>)
       }
      <div><input type="text" value={query} onChange={handleChange}></input><button>Search</button></div>
      </div>
      </main>
    )
  }