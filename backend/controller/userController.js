import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwTokens.js";
import cloudinary from "cloudinary";
import { Appointment } from "../models/appointmentSchema.js";

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, dob, gender, password,confirmPassword, role } = req.body;

    // Check for missing fields
    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !confirmPassword ||
        !dob ||
        !gender ||
        !password ||
        !role
    ) {
        return next(new ErrorHandler("Please fill Full Form", 400));
    }

    if (password !== confirmPassword) {
        return next(new ErrorHandler("Password and Confirm Password did not match", 400));
    }


    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(new ErrorHandler("User Already Registered!", 400));
    }

    // Create a new user and handle validation errors
    try {
        const user = new User({ firstName, lastName, email, phone, dob, gender, password, role });
        await user.save();
        generateToken(user, "User Registered ! ", 200, res);

    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return next(new ErrorHandler(errors.join(', '), 400));
        } else {
            return next(new ErrorHandler("Server Error", 500));
        }
    }
});


export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        return next(new ErrorHandler("Please provide all details !", 400));
    }
   
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid Password or Email", 400));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Password or Email", 400));
    }
    if (role !== user.role) {
        return next(new ErrorHandler("Invalid Password or Email", 400));
    }
    generateToken(user, "User Logged in ! ", 200, res);
});

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone ,dob, gender, password ,role } = req.body;
    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !dob ||
        !gender ||
        !password
    ) {
        return next(new ErrorHandler("Please fill Full Form", 400));
    }



    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} with this E-mail is already registered`));
    }

    const admin = await User.create({
        firstName,
        lastName,
        email,
        phone,
        dob,
        gender,
        password,
        role: "Admin",
    });
    res.status(200).json({
        success:true,
        message:"Admin Registered",
        admin,
    })
});

export const getAllDoctors=catchAsyncErrors(async(req,res,next)=>{
    const doctors=await User.find({role:"Doctor"});
    res.status(200).json({
        success:true,
        doctors
    })

})

export const getUserDetails=catchAsyncErrors(async(req,res,next)=>{
    const user=req.user;
    res.status(200).json({
        success:true,
        user
    })

})

export const logoutAdmin=catchAsyncErrors(async (req,res,next)=>{
    res
    .status(200)
    .cookie("admintoken","",{
        httpOnly:true,
        expires:new Date(Date.now()),
        secure:true,
        sameSite:"None"
        
    })
    .json({
        success:true,
        message:"Admin Logged Out.",
    })
})

export const logoutPatient=catchAsyncErrors(async (req,res,next)=>{
    res
    .status(200)
    .cookie("patientToken","",{
        httpOnly:true,
        expires:new Date(Date.now()),
        secure:true,
        sameSite:"None"
       
    })
    .json({
        success:true,
        message:"Patient Logged Out.",
    })
})

export const addNewDoctor=catchAsyncErrors(async (req,res,next)=>{
    if(!req.files || Object.keys(req.files).length===0 ){
        return next(new ErrorHandler("Doctor Avatar Required!",400));
    }

    const {docAvatar}=req.files;
    const allowedFormats=["image/png","image/jpeg","image/jpg","image/webp"];
    if(!allowedFormats.includes(docAvatar.mimetype)){
        return next(new ErrorHandler("File format is not supported.",400));
    }
    const { firstName, lastName, email, phone, nic, dob, gender, password,doctorDepartment} = req.body;

   if(
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !nic ||
        !dob ||
        !gender ||
        !password ||
        !doctorDepartment||
        !docAvatar
       
   ){
    return next(new ErrorHandler("Please provide full details ",400));
   }

   const isRegistered=await User.findOne({email});
   if(isRegistered){
    return next(new ErrorHandler(`${isRegistered.role} already registered with this email! `,400));
   }
   const cloudinaryResponse=await cloudinary.uploader.upload(docAvatar.tempFilePath);
   if(!cloudinaryResponse || cloudinaryResponse.error){
    console.error("Cloudinary Error: ",cloudinaryResponse.error || "Unknown Cloudinary Error");
   }

   const doctor=await User.create({
    firstName, lastName, email, phone, nic, dob, gender, password,doctorDepartment,
    role:"Doctor",
    docAvatar:{
        public_id:cloudinaryResponse.public_id,
        url:cloudinaryResponse.secure_url,
    },
   });
   res.status(200).json({
    success:true,
    message:"New Doctor Registered!",
    doctor,
   })
})

// In your controller file
// In your controller file (e.g., appointmentController.js)




export const getDoctorAppointments = catchAsyncErrors(async (req, res, next) => {
    const doctorId = req.user._id;

    const appointments = await Appointment.find({ doctorId });

    res.status(200).json({
        success: true,
        appointments,
    });
});

export const logoutDoctor=catchAsyncErrors(async (req,res,next)=>{
    res
    .status(200)
    .cookie("doctortoken","",{
        httpOnly:true,
        expires:new Date(Date.now()),
         secure:true,
        sameSite:"None"
    })
    .json({
        success:true,
        message:"Doctor Logged Out.",
    })
})



