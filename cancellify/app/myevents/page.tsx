"use client"
import React, { useState, useEffect, useCallback} from "react"
import axios from "axios";
import Link from "next/link";
import { revalidatePath } from "next/cache";
const moment = require("moment")

export default function MyEvents() {
  //useState
  const [userIdForFetch, setUserIdForFetch] = useState<any>(null);
  const [allEvents, setAllEvents] = useState<any>(null);
  const [sortEvents, setSortedEvents] = useState<any>(null)
  const [pageCount, setPageCount] = useState<boolean>(false)

 
 
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

useEffect(()=>{
if(pageCount){
  window.location.reload()
}
},[pageCount])

  useEffect(()=>{
    if(allEvents){
    const sort = allEvents.sort((a:any, b:any)=> a.date.localeCompare(b.date))
    setSortedEvents(sort)
    }
    setAllEvents(null);
  }, [allEvents])

 //handler

 async function handleChangeAttendance(event:any){
  if(event.target.getAttribute("a-key") === "true"){
  // const url = "http://localhost:8080/events/cancel";
  let eventId: any = event.target.getAttribute("a-data")
    eventId = parseInt(eventId)
  const url = "https://cancellify-2681bafbf4fb.herokuapp.com/events/cancel";
  const data = await axios.patch(url, {attendance: true, eventId: eventId, userId: parseInt(userIdForFetch)}).catch(error => {
    window.alert(error.response.data);
  })
  handleGetEvents();
  }
  if(event.target.getAttribute("a-key") === "false"){
    let eventId: any = event.target.getAttribute("a-data")
    eventId = parseInt(eventId)
    // const url = "http://localhost:8080/events/cancel";
    const url = "https://cancellify-2681bafbf4fb.herokuapp.com/events/cancel";
    const date = await axios.patch(url, {attendance: false, eventId: eventId, userId: parseInt(userIdForFetch)}).catch(error => {
      window.alert(error.response.data);
      setPageCount(true)
    })
    
    handleGetEvents();
    
  }
  
 }

 function handleReload(){
  window.location.reload();
 }

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
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-violet-800 text-amber-300">
       {sortEvents ? (<div className="flex-col items-center justify-center bg-transparent border-0">{sortEvents.map((events:any, index:number)=> <div className= "shadow-2xl shadow-cyan-500/50 p-1 rounded flex-col justify-center mb-2" key={events.eventName}>{events.attendance === true ?
       <h1 className="flex justify-center items-center rounded rounded-br-none rounded-bl-none bg-emerald-800 ">Attending</h1>
       :<h1 className="flex justify-center items-center rounded rounded-br-none rounded-bl-none bg-emerald-800 border-0 ">Not Attending</h1>}
       <div className="bg-emerald-800 flex justify-center items-center ">{events.eventName}</div>
       <div className="bg-emerald-800 flex justify-center items-center ">{moment(events.date).format("MMM Do YY h:mma")}</div>
       <div className="bg-emerald-800 mb-2 rounded rounded-tr-none rounded-tl-none flex justify-center items-center" key={events.eventDescription}>{events.eventDescription}</div> 
       <div className="bg-violet-800 flex justify-center" key={index}>
        {events.attendance === false ?
        <button className="flex justify-center bg-emerald-800 rounded hover:bg-fuchsia-700 shadow-md w-fit p-1 mr-1.5 shadow-2xl shadow-cyan-500/50" onClick={handleChangeAttendance} onClickCapture={handleReload} a-key={"true"} a-data={`${events.eventId}`}>Want to Attend?</button>:
        <button className="flex justify-center bg-emerald-800 rounded hover:bg-fuchsia-700 shadow-md w-fit p-1 shadow-2xl shadow-cyan-500/50" onClick={handleChangeAttendance} onClickCapture={handleReload} a-key={"false"} a-data={`${events.eventId}`}>Thinking about Canceling?</button> 
      } 
        </div></div>)}
       </div>): <div>Loading</div>}
       
       <div className="flex justify-center align-items"> 
      <Link className="flex justify-center bg-emerald-800 rounded hover:bg-fuchsia-700 shadow-md w-fit p-1 mr-1.5 shadow-2xl shadow-cyan-500/50" href="/home"><button>Back to Home?</button></Link>
      <Link className="flex justify-center bg-emerald-800 rounded hover:bg-fuchsia-700 shadow-md w-fit p-1 mr-1.5 shadow-2xl shadow-cyan-500/50" href="/createevent"><button>To Event Creation</button></Link>
      </div>
      </main>
    )
  }