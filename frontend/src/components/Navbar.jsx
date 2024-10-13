import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../main';
import axios from 'axios';
import { toast } from 'react-toastify';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaCommentDots } from 'react-icons/fa'; // Import chat icon from react-icons

const Navbar = () => {
    const [show, setShow] = useState(true);
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);
    const navigateTo = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axios.get("https://with-refill-hms-backend.onrender.com/api/v1/user/patient/logout", {
                withCredentials: true,
            });
            toast.success(response.data.message);
            setIsAuthenticated(false);
        } catch (err) {
            toast.error(err.response?.data?.message || 'An error occurred');
        }
    };

    const gotoLogin = () => {
        navigateTo("/authi");
    };

    const handleClick = () => {
        gotoLogin();  // Call the function to navigate to login
        setShow(!show);  // Toggle the visibility state
      };

    return (
        <>
           <nav className={`container ${isAuthenticated ? 'authlinks' : ''}`}>
                <div className="logo">
                    <img src="/logo.png" alt="logo" className="logo-img" />
                </div>
                <div className={`${show ? "navLinks showmenu" : "navLinks"}`}>
                    <div className="links">
                        <Link 
                            to="/" 
                            onClick={() => setShow(!show)}
                            style={{
                                color: '#fff',
                                textDecoration: 'none',
                                backgroundColor: '#0088cc',
                                padding: '10px 20px',
                                borderRadius: '5px',
                                margin: '5px 0',
                                fontSize: '16px'
                            }}
                        >
                            HOME
                        </Link>
                        <Link 
                            to="/appointment" 
                            onClick={() => setShow(!show)}
                            style={{
                                color: '#fff',
                                textDecoration: 'none',
                                backgroundColor: '#0088cc',
                                padding: '10px 20px',
                                borderRadius: '5px',
                                margin: '5px 0',
                                fontSize: '16px'
                            }}
                        >
                            APPOINTMENT
                        </Link>
                        {isAuthenticated ? (
                            <Link 
                                to="/my-appointments" 
                                onClick={() => setShow(!show)}
                                style={{
                                    color: '#fff',
                                    textDecoration: 'none',
                                    backgroundColor: '#0088cc',
                                    padding: '10px 20px',
                                    borderRadius: '5px',
                                    margin: '5px 0',
                                    fontSize: '16px'
                                }}
                            >
                                MY APPOINTMENTS
                            </Link>
                        ) : (
                            <Link 
                                to="/about" 
                                onClick={() => setShow(!show)}
                                style={{
                                    color: '#fff',
                                    textDecoration: 'none',
                                    backgroundColor: '#0088cc',
                                    padding: '10px 20px',
                                    borderRadius: '5px',
                                    margin: '5px 0',
                                    fontSize: '16px'
                                }}
                            >
                                ABOUT US
                            </Link>
                        )}
                    </div>
                    {isAuthenticated ? 
                        (<button className="logoutBtn btn" onClick={handleLogout} style={{ cursor: "pointer" }}>LOGOUT</button>) :
                        (<button className="loginBtn btn" onClick={handleClick} style={{ cursor: "pointer" }}>SIGN UP</button>)
                    }
                </div>
                <div className="hamburger" onClick={() => setShow(!show)}>
                    <GiHamburgerMenu />
                </div>
            </nav>

            {/* Chat Icon */}
            <div 
                style={{
                    position: 'fixed',
                    right: '50px',
                    bottom: '30px',
                    cursor: 'pointer',
                    zIndex: 1000,
                    backgroundColor: '#0088cc',
                    borderRadius: '50%',
                    padding: '10px',
                    color: 'white',
                }}
                onClick={() => window.open('https://t.me/general_cans_hospital_bot', '_blank')}
            >
                <FaCommentDots size={24} />
            </div>
        </>
    );
};

export default Navbar;
