"use client"

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from "axios";


// import LoginForm from './LoginForm';


export default function Register () {
    const [statusCode, setStatusCode] = useState<number| null>(null);
    const [correctStatusCode, setCorrectStatusCode] = useState<boolean>(false);

    const router = useRouter();


    useEffect(() => {
        if(statusCode === 201){
          setCorrectStatusCode(true);
          router.push("/login")
        }       
    }, [statusCode, router])

    const form = useForm({
        defaultValues: {
            username: "",
            password: "",
            email: "",
            firstName: "",
            lastName: ""
        }
    });

    const { register, control, handleSubmit, formState } = form;
    const { errors } = formState;

    const onSubmit = async (data: object) => {
        // const url = "http://localhost:8080/accounts/new"
        const url = "https://cancellify-2681bafbf4fb.herokuapp.com/accounts/new"
        const returnedData = await axios.post(url, data).catch(error => {
            window.alert(error.response.data);
        });
        
        

        if(returnedData){
            setStatusCode(returnedData.status);
            window.alert(returnedData.data)
        }
    }

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-violet-800 w-screen h-screen m-0 text-amber-300 body-font font-poppins">
            <div className="flex min-h-full flex-col justify-center items-center px-6 py-12 lg:px-8 space-y-6 text-left ">
            <form className="flex min-h-full flex-col justify-center items-center px-6 py-12 lg:px-8 space-y-6 text-left" onSubmit={handleSubmit(onSubmit)} noValidate>
            <h1 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight'>Registration Form</h1>
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
                

                <div className='form-control flex justify-center'>
                
                    <label className="bg-emerald-800 rounded rounded-r-none p-2 w-24" htmlFor='password'>Password</label>
                    <input
                    className='rounded rounded-l-none p-2 text-emerald-800' 
                        type='password' 
                        id='password' 
                        {...register("password", {
                            required: {
                                value: true,
                                message: "*Password is required"
                            }
                        })} 
                    />
                    <p className='error'>{errors.password?.message}</p>
                </div>
                

                <div className='form-control flex justify-center'>
                    <label  className="bg-emerald-800 rounded rounded-r-none p-2 w-24" htmlFor='email'>Email</label>
                    <input 
                    className='rounded rounded-l-none p-2 text-emerald-800'
                        type='email' 
                        id='email' 
                        {...register("email", {
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "Invalid email format."
                            },
                            required: {
                                value:true,
                                message: "*Email is required"
                            }
                        })} 
                        
                    />
                    <p className='error'>{errors.email?.message}</p>
                </div>
                
                <div className='form-control flex justify-center'>
                
                    <label className="bg-emerald-800 rounded rounded-r-none p-2 w-24" htmlFor='firstName'>First Name</label>
                    <input 
                    className='rounded rounded-l-none p-2 text-emerald-800'
                        type='text' 
                        id='firstName' 
                        {...register("firstName", {
                            required: {
                                value: true,
                                message: "*First name is required"
                            }
                        })} 
                    />
                    <p className='error'>{errors.firstName?.message}</p>
                </div>
             

                <div className='form-control flex justify-center'>
                
                  <label className="bg-emerald-800 rounded rounded-r-none p-2 w-24" htmlFor='lastName'>Last Name</label>
                    <input 
                    className='rounded rounded-l-none p-2 text-emerald-800'
                        type='text' 
                        id='lastName' 
                        {...register("lastName", {

                            required: {
                                value: true,
                                message: "*Last name is required"
                            }
                        })} 
                    />
                    <br />
                    <p className='error'>{errors.lastName?.message}</p>
                </div>
                

                <button className="flex justify-center bg-emerald-800 rounded hover:bg-fuchsia-700 shadow-md w-fit p-1 shadow-2xl shadow-cyan-500/50" type='submit'>Register</button>
                 <Link className="flex justify-center bg-emerald-800 rounded hover:bg-fuchsia-700 shadow-md w-fit p-1 shadow-2xl shadow-cyan-500/50" href="/login"><button  >Back To Login</button></Link>
            </form>
            </div>

           
            </div>
        </>
    );
};