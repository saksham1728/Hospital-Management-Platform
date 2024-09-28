import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import Biography from '../components/Biography';
import Departments from '../components/Departments';
import MessageForm from '../components/MessageForm';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {/* Pass the Spline URL as a prop to Hero */}
      <Hero 
        title={"Welcome to CANS Multi Specialty Hospital"} 
         splineUrl={"https://prod.spline.design/QLlkSJLHKgUXSrSN/scene.splinecode"} 
        imageUrl={"./hero.png"} 
      />
      <Biography 
        imageUrl={"./feature.png"} 
        className="home-biography" 
      />
      <Departments />
      <MessageForm />
    </div>
  );
};

export default Home;
