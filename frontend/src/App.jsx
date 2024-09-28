import React, { useContext, useEffect } from 'react';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Appointment from "./pages/Appointment";
import AboutUs from "./pages/AboutUs";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MyAppointments from './pages/MyAppointments';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import { Context } from './main';
import axios from 'axios';
import Footer from './components/Footer';
import StopRapingPage from './pages/StopRaping';
import Authri from './pages/Authri';
import WaterFooter from './components/WaterFooter';

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/user/patient/me", { withCredentials: true });
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/authi" element={<Authri/>}/>
         <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-appointments" element={<MyAppointments/>} />
          <Route path="stop-raping" element={<StopRapingPage/>}/>
        </Routes>
        <Footer />
        <WaterFooter/>
        <ToastContainer position='top-center' />
      </Router>
    </>
  );
};

export default App;
