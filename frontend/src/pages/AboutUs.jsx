import React, { useEffect } from 'react'
import Hero from '../components/Hero'
import Biography from '../components/Biography'

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
    <Hero title={"Learn More AboutUs | CANS Multi Specialty Hospital"} imageUrl={"/about.png"}/>
    <Biography imageUrl={"/whoweare.png"}/>
      
    </>
  )
}

export default AboutUs
