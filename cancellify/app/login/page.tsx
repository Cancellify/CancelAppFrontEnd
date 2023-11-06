"use client"
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// import { createContext } from 'react';

// export let playerInfo = createContext();
// export let username = createContext();


export default function LoginForm() {
    const [playerId, setPlayerId] = useState<number |null>(null)
    const [statusCode, setStatusCode] = useState<number | null>(null);
    const [correctStatusCode, setCorrectStatusCode] = useState<boolean>(false);
  

    //  playerInfo = createContext(playerId);
    //  username = createContext(playerUsername);
    const router = useRouter();

    useEffect(() => {
        if(statusCode === 200){
          setCorrectStatusCode(true);
            router.push("/home");
        }       
      
    }, [statusCode, router])

   

    const form = useForm({
        defaultValues: {
            username: "",
            password: ""
        }
    });

    const { register, control, handleSubmit, formState } = form;
    const { errors } = formState;

    const onSubmit = async (data: object) => {
        const url = "http://localhost:8080/accounts/login";
        const returnedData = await axios.post(url, data).catch(error => {
            window.alert(error.response.data)});
        if(returnedData){
            setStatusCode(returnedData.status);
        }            
    }

    return (  
       <>
        <div>
          
            <h1 className='loginHeader'>Login Form</h1>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className='form-control'>
                    <label htmlFor='username'>Username</label>
                    <input 
                        type='text' 
                        id='username' 
                        {...register("username", {
                            required: {
                                value: true,
                                message: "Username is required."
                            }
                        })} 
                    />
                    <p className='error'>{errors.username?.message}</p>
                </div>
                <div className='form-control'>
                    <label htmlFor='password'>Password</label>
                    <input 
                        type='password' 
                        id='password' 
                        {...register("password", {
                            required: {
                                value: true,
                                message: "Password is required."
                            }
                        })} 
                    />
                    <p className='error'>{errors.password?.message}</p>
                </div>         
                <button className='link 'type='submit'>Log In</button>
            </form>
            <Link href="/register"><button  className='link' >Register</button></Link>
        </div>
        </>

    );
};