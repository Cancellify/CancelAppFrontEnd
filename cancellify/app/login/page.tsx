"use client"
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
    const [statusCode, setStatusCode] = useState<number | null>(null);
    const [correctStatusCode, setCorrectStatusCode] = useState<boolean>(false);
    const [user, setUser] = useState<string |null> (null)
    
    

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
        // const url = "http://localhost:8080/accounts/login";
        const url = "https://cancellify-2681bafbf4fb.herokuapp.com/accounts/login"
        const returnedData = await axios.post(url, data).catch(error => {
            window.alert(error.response.data)});
        if(returnedData){
            localStorage.setItem("username", returnedData.data.username)
            localStorage.setItem("id", returnedData.data.id)
            setStatusCode(returnedData.status);
        }            
    }

    return (  
       <>
        <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-violet-800  text-amber-300 body-font font-poppins">
          
            <h1 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight p-2'>Login Form</h1>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className='form-control flex justify-center'>
                    <label className="bg-emerald-800 rounded rounded-r-none p-2 w-24" htmlFor='username'>Username</label>
                    <input 
                    className='rounded rounded-l-none p-2 text-emerald-800'
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
                <div className='form-control flex justify-center p-2'>
                    <label className="bg-emerald-800 rounded rounded-r-none p-2 w-24" htmlFor='password'>Password</label>
                    <input 
                    className='rounded rounded-l-none p-2 text-emerald-800'
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
                <div className='flex justify-center p-2'>       
                <button className="flex justify-center bg-emerald-800 rounded hover:bg-fuchsia-700 shadow-md w-fit p-1" type='submit'>Log In</button>
                </div>  
            </form>
            <Link href="/register"><button  className="flex justify-center bg-emerald-800 rounded hover:bg-fuchsia-700 shadow-md w-fit p-1" >Register</button></Link>
        </div>
        </>

    );
};

