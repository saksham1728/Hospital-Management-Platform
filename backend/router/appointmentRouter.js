import express from "express"
import { deleteAppointment, getAllAppointments, postAppointment, updateAppointmentStatus, getUserAppointments, updatePrescription, getRefillRequestsForAppointment, updatePrescriptionRefill } from "../controller/appointmentController.js";
import { isAdminAuthenticated, isDoctorAuthenticated, isPatientAuthenticated } from "../middlewares/auth.js";


const router=express.Router();

router.post("/post",isPatientAuthenticated,postAppointment);
router.get("/getall",isAdminAuthenticated,getAllAppointments);
router.put("/update/:id",isAdminAuthenticated,updateAppointmentStatus);
router.put("/update-prescription/:id",isDoctorAuthenticated,updatePrescription);
router.get("/user/appointments",isPatientAuthenticated,getUserAppointments);
router.put("/:id/refill-request",isPatientAuthenticated,updatePrescriptionRefill);
router.post("/request-refill",updatePrescriptionRefill);
router.get("/:id/refill-request",isDoctorAuthenticated,getRefillRequestsForAppointment);
router.delete("/delete/:id",isAdminAuthenticated,deleteAppointment);



export default router;
