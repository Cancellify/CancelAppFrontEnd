"use client"
import axios from "axios";
import React, {useState, useEffect} from "react"

export default function CreateEvents() {
  const [friends, setFriends] = useState<any>([])
  const [query, setQuery] = useState<String>("")
  const [queryResults, setQueryResults] = useState<any>([])
  const [date, setDate] = useState<any>(null)
  const [time, setTime] = useState<any>(null)

  useEffect(() => {
    fetchUsers();
  }, [])

  
  useEffect(()=>{
      handleQuery();
  }, [query])

  useEffect(() => {
    console.log(date),
    console.log(time)
  }, [date, time])

  function handleDate(event :any ) {
    setDate(event.target.value)
  }

  function handleTime(event: any) {
    setTime(event.target.value)
  }

  function handleChange(event: any) {
      setQuery(event.target.value.toLowerCase());

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
       <div>
       <div>Event Name</div>
        <input type="date" onChange={handleDate}></input>
        <input type="time" onChange={handleTime}/>
        <div>Event Name</div>
        <input type="text"></input>
        <div>Event Description</div>
        <textarea></textarea>
       </div>
       {query.length !==0 &&(<div><ul>{queryResults.map((result:any) => <li>{result.username} {result.first_name} {result.last_name}</li>)}</ul></div>)
       }
      <div><input type="text" onChange={handleChange}></input><button>Search</button></div>
      </main>
    )
  }