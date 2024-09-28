import React from 'react';
import { Link } from 'react-router-dom';
import Spline from '@splinetool/react-spline'; // Import Spline

const Hero = ({ title, imageUrl, splineUrl }) => {
  return (
    <div className="hero container">
      <div className="banner">
        <h1>{title}</h1>
        <p>
          CANS Multi Specialty Hospital is a state-of-the-art facility providing comprehensive healthcare services with compassion and expertise.
          Our team of skilled professionals is committed to delivering personalized care tailored to each patient's needs.
          At CANS Multi Specialty Hospital, we prioritize your well-being, 
          ensuring a harmonious journey toward optimal health and wellness.
        </p>
        <p className="highlight">
          Learn more about why it's crucial to understand the severity of rape and take action.
          <br></br>
          <Link to="/stop-raping" className="read-more-link">Read More</Link>
        </p>
      </div>

      <div className="banner">
        {splineUrl ? (
          // Render Spline 3D design if splineUrl is provided
          <div className="spline-container">
            <Spline scene={splineUrl} />
          </div>
        ) : (
          // Fallback to rendering image if no splineUrl is provided
          <img src={imageUrl} alt="hero" className="animated-image" />
        )}
        <span>
          <img src="./Vector.png" alt="vector" />
        </span>
      </div>
    </div>
  );
};

export default Hero;
