import mongoose from "mongoose";
import validator from "validator";


const messageSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3,"First Name Must contain at least 3 characters"]
    },
    lastName:{
        type:String,
        required:true,
        minLength:[3,"Last Name Must contain at least 3 characters"]
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"Please enter a valid E-mail"]
    },
    phone:{
        type:Number,
        required:true,
        maxLength:[10,"Phone number must contain 10 digits "]
    },
    message:{
        type:String,
        required:true,
        minLength:[10,"Message must contain at least 10 characters"]
    },
});

export const Message=mongoose.model("Message",messageSchema);