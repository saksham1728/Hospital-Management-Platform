import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Appointment } from "../models/appointmentSchema.js";
import {User} from "../models/userSchema.js";


export const postAppointment=catchAsyncErrors(async(req,res,next)=>{
    const {firstName,lastName,email,phone,nic,dob,gender,
        appointment_date,department,doctor_firstName,doctor_lastName,
        hasVisited,address,
    }=req.body;

    if(
        !firstName||
        !lastName||
        !email||
        !phone||
        !nic||
        !dob||
        !gender||
        !appointment_date||
        !department||
        !doctor_firstName||
        !doctor_lastName||
        !address
    ){
        return next(new ErrorHandler("Please fill Full form !",400));
    }

    const isConflict=await User.find({
        firstName:doctor_firstName,
        lastName:doctor_lastName,
        role:"Doctor",
        doctorDepartment:department
    })
    if(isConflict.length===0){
        return next(new ErrorHandler("Doctor Not Found"),404);
    }
    if(isConflict.length>1){
        return next(new ErrorHandler("Doctors conflict! Please contact through email and phone ",404));
    }

    const doctorId=isConflict[0]._id;
    const patientId=req.user._id;
    const appointment=await Appointment.create({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        appointment_date,
        department,
        doctor:{
            firstName: doctor_firstName,
            lastName:doctor_lastName
        },
        hasVisited,
        address,
        doctorId,
        patientId,
    });
    res.status(200).json({
        success:"true",
        message:"Appointment Sent Successfully!",
        appointment,
    })
});

export const getAllAppointments=catchAsyncErrors(async(req,res,next)=>{
    const appointments=await Appointment.find();
    res.status(200).json({
        success:true,
        appointments,
    });
});

export const updateAppointmentStatus = catchAsyncErrors(async (req,res,next)=>{
    const {id}=req.params;
    let appointment=await Appointment.findById(id);
    if(!appointment){
        return next(new ErrorHandler("Appointment Not Found !"),404);
    }
    appointment=await Appointment.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });
    res.status(200).json({
        success:true,
        message:"Appointment Status Updated ",
        appointment
    })
});

export const getUserAppointments = catchAsyncErrors(async (req, res, next) => {
    const userId = req.user._id; // Ensure user ID is available in req.user
    
    const appointments = await Appointment.find({ patientId: userId });

    if (!appointments) {
        return next(new ErrorHandler("No appointments found for this user.", 404));
    }

    res.status(200).json({
        success: true,
        appointments,
    });
});

export const deleteAppointment=catchAsyncErrors(async (req,res,next)=>{
    const {id}=req.params;
    let appointment=await Appointment.findById(id);
    if(!appointment){
        return next(new ErrorHandler("Appointment not found ",404));
    }
    await appointment.deleteOne();
    res.status(200).json({
        success:true,
        message:"Appointment Deleted ",
    })
});

export const updatePrescription = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const { doctorNotes, prescription } = req.body;

    let appointment = await Appointment.findById(id);
    if (!appointment) {
        return next(new ErrorHandler("Appointment not found", 404));
    }

    appointment.doctorNotes = doctorNotes;
    appointment.prescription = prescription;

    await appointment.save();

    res.status(200).json({
        success: true,
        message: "Prescription updated successfully",
        appointment,
    });
});


export const updatePrescriptionRefill = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params; // Appointment ID
    const { refillRequest } = req.body; // Refill request sent from the frontend

    const appointment = await Appointment.findById(id);
    if (!appointment) {
        return next(new ErrorHandler("Appointment not found", 404));
    }

    appointment.refillRequest = refillRequest; // Update refill request in the appointment

    await appointment.save();

    res.status(200).json({
        success: true,
        message: "Refill request submitted successfully",
        appointment,
    });
});

export const getRefillRequestsForAppointment = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params; // Appointment ID

    const appointment = await Appointment.findById(id);
    if (!appointment || !appointment.refillRequest) {
        return next(new ErrorHandler("No refill requests found for this appointment", 404));
    }

    res.status(200).json({
        success: true,
        refillRequest: appointment.refillRequest,
    });
});
