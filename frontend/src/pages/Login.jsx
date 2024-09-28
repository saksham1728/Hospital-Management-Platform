import React, { useContext, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Context } from '../main';
import axios from 'axios';

const Login = () => {
  const {isAuthenticated,setIsAuthenticated}=useContext(Context);
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  

  const navigateTo=useNavigate();

  const handleLogin=async(e)=>{
    e.preventDefault();
    try{
      const response=await axios.post(
        "http://localhost:3000/api/v1/user/login",
        {email,password,role:"Patient"},
        {withCredentials:true,
          headers:{"Content-Type":"application/json"}

        }
      );
      toast.success(response.data.message);
      setIsAuthenticated(true);
      navigateTo("/");
    }catch(error){
      toast.error(error.response.data.message);
    }
  };

  if(isAuthenticated){
    return <Navigate to ={"/"} />
  }


  return (
    <div className="container form-component login-form ">
      <h2>Sign In</h2>
      <p>Please Login to Continue</p>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque officiis placeat ratione provident exercitationem laborum, repellendus quae rem amet voluptatibus</p>
      <form onSubmit={handleLogin}>
        <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
        
        <div style={{gap:"10px",justifyContent:"flex-end", flexDirection:"row"}}>
          <p style={{marginBottom: 0}}>Not Registered </p>
          <Link to={"/register"} style={{textDecoration:"none",alignItems:"center"}}>Register Now</Link>
        </div>
        <div style={{justifyContent:"center",alignItems:"center"}}>
          <button type="submit" style={{cursor:"pointer"}}>Login</button>
        </div>       
      </form>   
    </div>
  )
}

export default Login
