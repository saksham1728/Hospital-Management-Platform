import React, { useContext, useState } from 'react'
import { Context } from '../main';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddNewAdmin = () => {

    const {isAuthenticated,setIsAuthenticated}=useContext(Context);

  const [firstName,setFirstName]=useState("");
  const [lastName,setLastName]=useState("");
  const [email,setEmail]=useState("");
  const [phone,setPhone]=useState("");
  const [password,setPassword]=useState("");
  const [confirmPassword,setConfirmPassword]=useState("");
  const [gender,setGender]=useState("");
  const [dob,setDob]=useState("");

  const navigateTo=useNavigate();

  const handleAddNewAdmin= async (e)=>{
    e.preventDefault();
    try{
      const response=await axios.post(
        "https://with-refill-hms-backend.onrender.com/api/v1/user/admin/addnew",
        {firstName,lastName,email,phone,dob,gender,password},
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
  if(!isAuthenticated){
    return <Navigate to={"/login"}/>
  }

  return (
    <>
    <section className="page">

    <div className="container form-component add-admin-form">
      <img src="/logo.png" alt="logo" className="logo" style={{height:"30vh", paddingBottom:"30px"}}/>
      <h1 className="form-title">Add New Admin</h1>
    
      <form onSubmit={handleAddNewAdmin}>
        <div>
        <input type="text" placeholder="First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
        <input type="text" placeholder="Last Name" value={lastName} onChange={(e)=>setLastName(e.target.value)} />
       </div>
       <div>
        <input type="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="number" placeholder="Phone" value={phone} onChange={(e)=>setPhone(e.target.value)} />
       </div>
       <div>
       <select value={gender} onChange={(e)=>setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        
          <input type="date" placeholder="Date of Birth" value={dob} onChange={(e)=>setDob(e.target.value)}/>
      </div>
      <div>
         
          <input 
          type="password"
          placeholder="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          />   
            <input type="password" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          placeholder="Confirm Password" 
          />
        </div>
        <div style={{justifyContent:"center",alignItems:"center"}}>
          <button type="submit" style={{cursor:"pointer"}}>Register</button>
        </div>       

      </form>
    </div>

    </section>
      
    </>
  )
}

export default AddNewAdmin
