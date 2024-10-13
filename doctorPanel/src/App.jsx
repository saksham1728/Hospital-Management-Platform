import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DoctorLogin from '/src/pages/DoctorLogin';
import DoctorAppointments from '/src/pages/DoctorAppointments';
import "./App.css"
import { Context } from './main';
import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

const App=()=> {
  const {isAuthenticated,setIsAuthenticated,setUser}=useContext(Context);

  useEffect(()=>{
    const fetchUser=async()=>{
      try{
        const response=await axios.get(
          "https://with-refill-hms-backend.onrender.com/api/v1/user/doctor/me",
          {withCredentials:true},
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      }catch(error){
        setIsAuthenticated(false);
        setUser([]);
      }
    };
    fetchUser();
  },[isAuthenticated]);


  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<DoctorAppointments />}  />
        <Route path="/Doctorlogin" element={<DoctorLogin />} />
      </Routes> 
    </Router>
    </>
  )
}

export default App;
