"use client"
import React, { useState, useEffect, useCallback} from "react"
import axios from "axios";
import Link from "next/link";
import { error } from "console";
const moment = require("moment")

export default function MyEvents() {
  //useState
  const [userIdForFetch, setUserIdForFetch] = useState<any>(null);
  const [allEvents, setAllEvents] = useState<any>(null);
  

 
 
//useEffect
  useEffect(() => {
    const id = localStorage.getItem("id");
    setUserIdForFetch(id);
  }, []);

useEffect(() => {
  if(userIdForFetch){
  handleGetEvents();
  }
}, [userIdForFetch])

useEffect(() => {
  if(allEvents){
  console.log(allEvents)
  }
}, [allEvents])



  useEffect(()=>{
    if(allEvents){
    const sort = allEvents.sort((a:any, b:any)=> a.date.localeCompare(b.date))
    
    }
  }, [allEvents])

 //handler

 async function handleChangeAttendance(event:any){
  if(event.target.getAttribute("a-key") === "true"){
  const url = "http://localhost:8080/events/cancel";
  let eventId: any = event.target.getAttribute("a-data")
    eventId = parseInt(eventId)
  // const url = "https://cancellify-2681bafbf4fb.herokuapp.com/events/cancel";
  await axios.patch(url, {attendance: true, eventId: eventId, userId: parseInt(userIdForFetch)}).catch(error => {
    window.alert(error.response.data);
  })
  handleGetEvents();
  }
  if(event.target.getAttribute("a-key") === "false"){
    let eventId: any = event.target.getAttribute("a-data")
    eventId = parseInt(eventId)
    const url = "http://localhost:8080/events/cancel";
    // const url = "https://cancellify-2681bafbf4fb.herokuapp.com/events/cancel";
    await axios.patch(url, {attendance: false, eventId: eventId, userId: parseInt(userIdForFetch)}).catch(error => {
      window.alert(error.response.data);
    })
    handleGetEvents();
  }
 }

  async function handleGetEvents(){
    const url = "http://localhost:8080/events/all";
    // const url = "https://cancellify-2681bafbf4fb.herokuapp.com/events/all"
    const returnedEvents = await axios.post(url, {id: userIdForFetch}).catch(error => {
      window.alert(error.response.data)});
    if(returnedEvents){
      setAllEvents(returnedEvents.data)
    }
  }

    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
       {allEvents ? (<div>{allEvents.map((events:any, index:number)=> <div key={events.eventName}>{events.attendance === true ?<h1>Attending</h1>:<h1>Not Attending</h1>}{events.eventName}: {moment(events.date).format("MMM Do YY")} <div key={events.eventDescription}>{events.eventDescription}</div> <div key={index}><button onClick={handleChangeAttendance} a-key={"true"} a-data={`${events.eventId}`}>Want to Attend?</button><button onClick={handleChangeAttendance} a-key={"false"} a-data={`${events.eventId}`}>Thinking about Canceling?</button> </div></div>)}
       </div>): <div>Loading</div>}
       <div>
      <Link href="/home"><button>Back to Home?</button></Link>
      <Link href="/createevent"><button>To Event Creation</button></Link>
      </div>
      </main>
    )
  }