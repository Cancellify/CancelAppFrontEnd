"use client"

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import axios from "axios";
import next from 'next';

// import LoginForm from './LoginForm';


export default function Register () {
    const [statusCode, setStatusCode] = useState<number| null>(null);
    const [correctStatusCode, setCorrectStatusCode] = useState<boolean>(false);


    useEffect(() => {
        if(statusCode === 201){
          setCorrectStatusCode(true);
        }       
    }, [statusCode])
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
        // const url = "https://pokedictionarygamedev.onrender.com/createNewAccount";
        const url = "http://localhost:8080/accounts/new"
        const returnedData = await axios.post(url, data).catch(error => {
            // window.alert(error.response.data);
            console.log(returnedData)
        });
        
        

        if(returnedData){
            setStatusCode(returnedData.status);
            window.alert(returnedData.data)
        }
    }

    return (
        <>
        {!correctStatusCode ?
            <div>
            <h1 className='loginHeader'>Registration Form</h1>
            <form className="registrationForm" onSubmit={handleSubmit(onSubmit)} noValidate>
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

                <div className='form-control'>
                    <label htmlFor='email'>Email</label>
                    <input 
                        type='email' 
                        id='email' 
                        {...register("email", {
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "Invalid email format."
                            }
                        })} 
                    />
                    <p className='error'>{errors.email?.message}</p>
                </div>

                <div className='form-control'>
                    <label htmlFor='firstName'>First Name</label>
                    <input 
                        type='text' 
                        id='firstName' 
                        {...register("firstName", {
                            required: {
                                value: true,
                                message: "First name is required."
                            }
                        })} 
                    />
                    <p className='error'>{errors.firstName?.message}</p>
                </div>

                <div className='form-control'>
                  <label htmlFor='lastName'>Last Name</label>
                    <input 
                        type='text' 
                        id='lastName' 
                        {...register("lastName", {

                            required: {
                                value: true,
                                message: "Last name is required."
                            }
                        })} 
                    />
                    <p className='error'>{errors.lastName?.message}</p>
                </div>

                <button className="link" type='submit'>Register</button>
            </form>

            <Link href="/"><button className="link" >Back To Home</button></Link>
            </div> :

            <div>Good Job!</div>}

        </>
    );
};