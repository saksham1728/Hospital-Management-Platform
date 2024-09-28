import React, { useEffect } from 'react'
import Hero from '../components/Hero'
import AppointmentForm from "../components/AppointmentForm"

const Appointment = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
    <Hero title={"Schedule Your Appointment online with zero convinence fee with CANS Multi Specialty Hospital"} imageUrl={"/signin.png"}/>
    <AppointmentForm/>
      
    </>
  )
}

export default Appointment
