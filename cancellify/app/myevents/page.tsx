"use client"
import React, { useState, useEffect, useCallback} from "react"
import axios from "axios";
import Link from "next/link";
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
  // async function handleGetEvents(){
  //   // const url = "http://localhost:8080/events/all";
  //   const url = "https://cancellify-2681bafbf4fb.herokuapp.com/events/all"
  //   const returnedEvents = await axios.post(url, {id: userIdForFetch}).catch(error => {
  //     window.alert(error.response.data)});
  //   if(returnedEvents){
  //     setAllEvents(returnedEvents.data)
  //   }
  handleGetEvents();
  }
  
}, [userIdForFetch])


  useEffect(()=>{
    if(allEvents){
    const sort = allEvents.sort((a:any, b:any)=> a.date.localeCompare(b.date))
    
    }
  }, [allEvents])

 //handler

//  async function handleChangeAttendance(){

//  }

  async function handleGetEvents(){
    // const url = "http://localhost:8080/events/all";
    const url = "https://cancellify-2681bafbf4fb.herokuapp.com/events/all"
    const returnedEvents = await axios.post(url, {id: userIdForFetch}).catch(error => {
      window.alert(error.response.data)});
    if(returnedEvents){
      setAllEvents(returnedEvents.data)
    }
  }

    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
       {allEvents ? (<div>{allEvents.map((events:any, index:number)=> <div key={index}>{events.eventName}: {moment(events.date).format("MMM Do YY")} <div key={index}>{events.eventDescription}</div> <div key={index}>{events.attendace ? <button>Want to Attend?</button> : <button>Thinking about Canceling?</button>} </div></div>)}
       </div>): <div>Loading</div>}
       <div>
      <Link href="/home"><button>Back to Home?</button></Link>
      <Link href="/createevent"><button>To Event Creation</button></Link>
      </div>
      </main>
    )
  }