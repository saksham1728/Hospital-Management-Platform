import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const userSchema=new mongoose.Schema({
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
   nic:{
    type:String,
    minLength:[12,"Aadhar Number must contain 12 digits"],
   },
   dob:{
    type:Date,
    required: [true,"DOB is requried"],
   },
   gender:{
    type:String,
    required:true,
    enum:["Male","Female","Others"]
   },
   password:{
    type:String,
    required:true,
    minLength:[8,"Password must contain 8 digits "],
    select: false,
   },
   role:{
    type:String,
    required:true,
    enum:["Admin","Patient","Doctor"],
   },
   doctorDepartment:{
    type:String,
   },
   docAvatar:{
    public_id:String,
    url:String,
   },
});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password=await bcrypt.hash(this.password,10);
});

userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};

userSchema.methods.generateJsonWebToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{expiresIn: process.env.JWT_EXPIRES})
}

export const User=mongoose.model("User",userSchema);