// src/components/DoctorLogin.jsx
import React, { useContext, useState } from 'react';
import { Context } from '../main';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const DoctorLogin = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigateTo = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:3000/api/v1/user/login",
                { email, password,role:"Doctor"},
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

    if (isAuthenticated) {
        return <Navigate to={"/"}/>;
    }

    return (
        <div className="container form-component">
            <img src="/logo.png" alt="logo" className="logo" style={{ height: "30vh", paddingBottom: "30px" }} />
            <h1 className="form-title">WELCOME TO CANS Hospital</h1>
            <p>Doctors only access the appointment dashboard.</p>

            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <div style={{ justifyContent: "center", alignItems: "center" }}>
                    <button type="submit" style={{ cursor: "pointer" }}>Login</button>
                </div>
            </form>
        </div>
    );
};

export default DoctorLogin;
