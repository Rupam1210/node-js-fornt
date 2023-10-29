import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import {Context, server}from '../main'
import toast from 'react-hot-toast'

const Register = () => {
  const [name,setname]=useState("");
  const [email,setemail]=useState("");
  const [password,setpassword]= useState("")
  const{ isAuthenticated, setIsAuthenticated, loading, setLoading }=useContext(Context);


  const submithandler= async(e)=>{
    e.preventDefault();
   try {
    const {data}=await axios.post(`${server}/users/new`,{
      name,email,password
    },{
      headers:{
        "Content-Type":"application/json",
      },
      withCredentials:true,
    });

    toast.success(data.message);
    setIsAuthenticated(true);
    
   } catch (error) {
    toast.error(error.response.data.message);
    setIsAuthenticated(false);
   
   }
  }
  if (isAuthenticated) return <Navigate to={"/"} />;
  return (
    <div className='login'>
    <section>
      <form onSubmit={submithandler}>
        <input value={name} type="text" placeholder='name' required
         onChange={(e)=>setname(e.target.value)}/>
        <input value={email} onChange={(e)=>setemail(e.target.value)} required
        type="email" placeholder='Email' />
        <input value={password} onChange={(e)=>setpassword(e.target.value)} required
         type="password" placeholder='password' />
        <button type='submit'>Signup</button>
        <h4>or</h4>
        <Link to={"/login"}>Login </Link>
      </form>
    </section>
  </div>
  )
}

export default Register