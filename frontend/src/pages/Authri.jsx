import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../main';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaGoogle } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';

const Authri = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");
  
    const navigateTo = useNavigate();

    const [active, setActive] = useState(false); // For toggling between login and signup forms

    const handleRegister = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(
          "https://with-refill-hms-backend.onrender.com/api/v1/user/patient/register",
          { firstName, lastName, email, phone, confirmPassword, dob, gender, password, role: "Patient" },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" }
          }
        );
        toast.success(response.data.message);
        setIsAuthenticated(true);
        navigateTo("/");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(
          "https://with-refill-hms-backend.onrender.com/api/v1/user/login",
          { email, password, role: "Patient" },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" }
          }
        );
        toast.success(response.data.message);
        setIsAuthenticated(true);
        navigateTo("/");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    // If authenticated, redirect to the home page
    if (isAuthenticated) {
      return <Navigate to="/" />;
    }

    return (
      <div className={`new-container ${active ? "active" : ""}`} id="container">
        {/* Register Form */}
        <div className="new-form-container new-sign-up">
          <form onSubmit={handleRegister}>
            <h1>Create Account</h1>
            <div className="social-icons">
              <a href="#" className="icon"><FaGoogle/></a>
              <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
            <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="number" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
            <input type="date" placeholder="Date of Birth" value={dob} onChange={(e) => setDob(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <button type="submit" style={{ cursor: "pointer" }}>Register</button>
          </form>
        </div>

        {/* Login Form */}
        <div className="new-form-container new-sign-in">
          <form onSubmit={handleLogin}>
            <div className="social-icons social-display">
              <a href="#" className="icon" style={{width:"40px",height:"40px", fontSize:"20px"}}><i className="fa-brands fa-google-plus-g"><FaGoogle/></i></a>
              <a href="#" className="icon" style={{width:"40px", fontSize:"20px"}}><i className="fa-brands fa-facebook-f"><FaFacebook/></i></a>
              <a href="#" className="icon" style={{width:"40px", fontSize:"20px"}}><i className="fa-brands fa-github"></i><FaGithub/></a>
              <a href="#" className="icon" style={{width:"40px", fontSize:"20px"}}><i className="fa-brands fa-linkedin-in"><FaLinkedin/></i></a>
            </div>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit" style={{ cursor: "pointer" }}>Login</button>
          </form>
        </div>

        {/* Toggle Panels */}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of the site features</p>
              <button className="hidden" id="login" onClick={() => setActive(false)}>Sign In</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Welcome, Friend!</h1>
              <p>Enter your personal details to use all of the site features</p>
              <button className="hidden" id="register" onClick={() => setActive(true)}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Authri;
