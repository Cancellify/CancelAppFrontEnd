"use client"
import React, { useState, useEffect} from "react"
import axios from "axios";

export default function MyEvents() {
  const [userIdForFetch, setUserIdForFetch] = useState<any>(null);
  const [allEvents, setAllEvents] = useState<any>(null)

  useEffect(() => {
    const id = localStorage.getItem("id");
    setUserIdForFetch(id)
  }, []);

  async function handleGetEvents(){
    const url = "http://localhost:8080/events/all";
    const returnedEvents = await axios.post(url, {id: userIdForFetch}).catch(error => {
      window.alert(error.response.data)});
    if(returnedEvents){
      setAllEvents(returnedEvents)
    }
  }

    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
       placeholder
      </main>
    )
  }