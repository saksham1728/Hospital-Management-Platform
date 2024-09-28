import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Context } from '../main';
import { Navigate } from 'react-router-dom';
import Modal from 'react-modal'; // Ensure Modal is imported
import { AiFillDelete } from 'react-icons/ai';

const MyAppointments = () => {
    const { isAuthenticated } = useContext(Context);
    const [appointments, setAppointments] = useState([]);
    const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
    const [isPrescriptionRefillEditorOpen, setIsPrescriptionRefillEditorOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [requestRefill, setRequestRefill] = useState("");

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const { data } = await axios.get("http://localhost:3000/api/v1/appointment/user/appointments", { withCredentials: true });
                setAppointments(data.appointments);
            } catch (error) {
                setAppointments([]);
                toast.error("Failed to fetch appointments");
                console.log("Some Error occurred ", error);
            }
        };

        if (isAuthenticated) {
            fetchAppointments();
        }
    }, [isAuthenticated]);

    const handleOpenPrescriptionModal = (appointment) => {
        // Ensure only one modal is open at a time by closing the other modal
        setIsPrescriptionRefillEditorOpen(false);
        setSelectedAppointment(appointment);
        setIsPrescriptionModalOpen(true);
    };

    const handleClosePrescriptionModal = () => {
        setIsPrescriptionModalOpen(false);
        setSelectedAppointment(null);  // Reset selected appointment
    };

    const handleOpenPrescriptionEditor = (appointment) => {
        // Ensure only one modal is open at a time by closing the other modal
        setIsPrescriptionModalOpen(false);
        setSelectedAppointment(appointment);
        setRequestRefill(appointment.requestRefill || "");
        setIsPrescriptionRefillEditorOpen(true);
    };

    const handleClosePrescriptionEditor = () => {
        setIsPrescriptionRefillEditorOpen(false);
        setSelectedAppointment(null);  // Reset selected appointment
    };

    const handleSavePrescriptionRefill = async () => {
        if (!selectedAppointment) return;

        try {
            await axios.put(`http://localhost:3000/api/v1/appointment/${selectedAppointment._id}/refill-request`, {
                refillRequest: requestRefill
            }, {
                withCredentials: true
            });

            toast.success("Refill request submitted successfully");
            handleClosePrescriptionEditor();
        } catch (error) {
            toast.error("Failed to submit refill request");
        }
    };

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm("Do you want to delete this appointment?");
        if (isConfirmed) {
            try {
                await axios.delete(`http://localhost:3000/api/v1/appointment/delete/${id}`, { withCredentials: true });
                setAppointments(appointments.filter(appointment => appointment._id !== id));
                toast.success("Appointment deleted successfully");
            } catch (error) {
                toast.error("Failed to delete appointment");
            }
        }
    };

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return (
        <section className="dashboard page my-appointments">
            <div className="banner">
                <h5>My Appointments</h5>
                <table>
                    <thead>
                        <tr>
                            <th>Patient</th>
                            <th>Doctor</th>
                            <th>Date</th>
                            <th>Department</th>
                            <th>Status</th>
                            <th>Prescription</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.length > 0 ? (
                            appointments.map((appointment) => (
                                <tr key={appointment._id}>
                                    <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                                    <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                                    <td>{appointment.appointment_date.substring(0, 16)}</td>
                                    <td>{appointment.department}</td>
                                    <td className={appointment.status === "Pending" ? "value-pending"
                                        : appointment.status === "Rejected" ? "value-rejected" : "value-accepted"}>
                                        {appointment.status}
                                    </td>
                                    <td>
                                        <button
                                            style={{
                                                color: '#fff',
                                                textDecoration: 'none',
                                                backgroundColor: '#0088cc',
                                                padding: '5px 10px',
                                                borderRadius: '5px',
                                                margin: '5px 0',
                                                fontSize: '12px'
                                            }}
                                            onClick={() => handleOpenPrescriptionModal(appointment)}
                                        >
                                            View Prescription
                                        </button>
                                        <button
                                            style={{
                                                color: '#fff',
                                                textDecoration: 'none',
                                                backgroundColor: '#28a745', // Green for refill request
                                                padding: '5px 10px',
                                                borderRadius: '5px',
                                                margin: '5px 0',
                                                marginLeft: '1rem', // Space between buttons
                                                fontSize: '12px'
                                            }}
                                            onClick={() => handleOpenPrescriptionEditor(appointment)}
                                        >
                                            Request Refill
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            style={{ marginLeft: "1rem" }}
                                            onClick={() => handleDelete(appointment._id)}
                                            className="delete-btn"
                                        >
                                            <AiFillDelete />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">No Appointments</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Prescription Modal */}
            {selectedAppointment && isPrescriptionModalOpen && (
                <Modal
                    isOpen={isPrescriptionModalOpen}
                    onRequestClose={handleClosePrescriptionModal}
                    className="modal"
                    overlayClassName="modal-backdrop"
                >
                    <div className="modal-header">
                        <h2 className="modal-title">Prescription</h2>
                        <button className="modal-close" onClick={handleClosePrescriptionModal}>X</button>
                    </div>
                    <div className="modal-content">
                        <textarea
                            value={selectedAppointment.prescription || "No prescription available"}
                            readOnly
                        />
                    </div>
                    <div className="modal-footer">
                        <button className="button" onClick={handleClosePrescriptionModal}>Close</button>
                    </div>
                </Modal>
            )}

            {/* Refill Editor Modal */}
            {selectedAppointment && isPrescriptionRefillEditorOpen && (
                <Modal
                    isOpen={isPrescriptionRefillEditorOpen}
                    onRequestClose={handleClosePrescriptionEditor}
                    contentLabel="Prescription Refill Editor"
                    className="modal"
                    overlayClassName="modal-backdrop"
                >
                    <div className="modal-header">
                        <h2 className="modal-title">Request Prescription Refill</h2>
                        <button className="modal-close" onClick={handleClosePrescriptionEditor}>X</button>
                    </div>
                    <div className="modal-content">
                        <textarea
                            value={requestRefill}
                            onChange={(e) => setRequestRefill(e.target.value)}
                            placeholder="Why do you need a refill?"
                        />
                    </div>
                    <div className="modal-footer" style={{ gap: "10px" }}>
                        <button className="button" onClick={handleSavePrescriptionRefill}>Submit Request</button>
                        <button className="button" onClick={handleClosePrescriptionEditor}>Close</button>
                    </div>
                </Modal>
            )}
        </section>
    );
};

export default MyAppointments;
