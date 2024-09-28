import mongoose from "mongoose";
import validator from "validator";
const appointmentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "First Name Must contain at least 3 characters"]
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "Last Name Must contain at least 3 characters"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please enter a valid E-mail"]
    },
    phone: {
        type: Number,
        required: true,
        maxLength: [10, "Phone number must contain 10 digits "]
    },
    nic: {
        type: String,
        required: true,
        minLength: [12, "Aadhar Number must contain 12 digits"],
    },
    dob: {
        type: Date,
        required: [true, "DOB is requried"],
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"],
    },
    appointment_date: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    doctor: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
    },
    hasVisited: {
        type: Boolean,
        default: false,
    },
    doctorId: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    patientId: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending",
    },
    doctorNotes: {
        type: String,
        default: "",
    },
    prescription: {
        type: String,
        default: "",
    },
    refillRequest:
        {
            type:String,
        },
    

});

export const Appointment = mongoose.model("Appointment", appointmentSchema);