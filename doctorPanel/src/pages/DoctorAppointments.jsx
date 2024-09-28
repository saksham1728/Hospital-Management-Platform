import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Context } from '../main';
import { Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-modal';
import ZegoCall from './ZegoCall';
import { FaVideo } from 'react-icons/fa'; 

const DoctorAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [showDoctorInfo, setShowDoctorInfo] = useState(false);
    const [sortOrder, setSortOrder] = useState('desc');
    const [isPrescriptionEditorOpen, setIsPrescriptionEditorOpen] = useState(false);
    const [doctorNotes, setDoctorNotes] = useState("");
    const [prescription, setPrescription] = useState("");
    const [isRefillModalOpen, setIsRefillModalOpen] = useState(false);
    const [refillRequest, setRefillRequest] = useState("");
    const [showVideoCall, setShowVideoCall] = useState(false);

    const navigateTo = useNavigate();
    const { isAuthenticated, setIsAuthenticated, user } = useContext(Context);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/user/doctor/appointments", {
                    withCredentials: true
                });
                setAppointments(response.data.appointments);
            } catch (error) {
                toast.error("Failed to fetch appointments");
            }
        };

        if (isAuthenticated) {
            fetchAppointments();
        }
    }, [isAuthenticated]);

    const handleOpenPrescriptionModal = async (appointment) => {
        setSelectedAppointment(appointment);

        try {
            const { data } = await axios.get(
                `http://localhost:3000/api/v1/appointment/${appointment._id}/refill-request`,
                { withCredentials: true }
            );
            setRefillRequest(data.refillRequest); 
            setIsRefillModalOpen(true);
        } catch (error) {
            toast.error("Failed to fetch refill request");
        }
    };

    const handleOpenRefillRequestModal = async (appointment) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/appointment/${appointment._id}/refill-request`, {
                withCredentials: true
            });
            const refillRequest = response.data.refillRequest;
            setSelectedAppointment({ ...appointment, refillRequest });
            setIsRefillModalOpen(true);
        } catch (error) {
            toast.error("Failed to fetch refill request");
        }
    };
    
    const handleStartVideoCall = () => {
        setShowVideoCall(true);
    };

    const handleCloseVideoCall = () => {
        setShowVideoCall(false);
    };

    const handleClosePrescriptionModal = () => {
        setIsRefillModalOpen(false);
        setSelectedAppointment(null);
        setRefillRequest(""); 
    };

    const handleOpenPrescriptionEditor = (appointment) => {
        setSelectedAppointment(appointment);
        setDoctorNotes(appointment.doctorNotes || "");
        setPrescription(appointment.prescription || "");
        setIsPrescriptionEditorOpen(true);
    };

    const handleClosePrescriptionEditor = () => {
        setIsPrescriptionEditorOpen(false);
        setSelectedAppointment(null);
    };

    const handleSavePrescription = async () => {
        try {
            await axios.put(
                `http://localhost:3000/api/v1/appointment/update-prescription/${selectedAppointment._id}`,
                { doctorNotes, prescription },
                { withCredentials: true }
            );
            toast.success("Prescription updated successfully");
            handleClosePrescriptionEditor();
        } catch (error) {
            toast.error("Failed to update prescription");
        }
    };

    const handleLogout = async () => {
        const confirmLogout = window.confirm("Do you really want to log out?");
        if (confirmLogout) {
            try {
                const res = await axios.get("http://localhost:3000/api/v1/user/doctor/logout", {
                    withCredentials: true,
                });
                toast.success(res.data.message);
                setIsAuthenticated(false);
                navigateTo("/Doctorlogin");
            } catch (err) {
                toast.error(err.response?.data?.message || "Logout failed");
            }
        }
    };

    const handleRowClick = (appointment) => {
        setSelectedAppointment(appointment);
    };

    const handleCloseModal = () => {
        setSelectedAppointment(null);
        setShowDoctorInfo(false);
    };

    const handleDoctorNameClick = () => {
        setShowDoctorInfo(true);
    };

    const sortAppointmentsByDate = () => {
        const sortedAppointments = [...appointments].sort((a, b) => {
            const dateA = new Date(a.appointment_date);
            const dateB = new Date(b.appointment_date);
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });
        setAppointments(sortedAppointments);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    if (!isAuthenticated) {
        return <Navigate to={"/Doctorlogin"} />;
    }

    return (
        <>
            <FaVideo
                size={60}
                style={{
                    position: 'fixed',
                    bottom: '30px',
                    right: '30px',
                    cursor: 'pointer',
                    color: '#28a745'
                }}
                onClick={() => handleStartVideoCall()}
            />

            <nav className="navbar">
                <div className="logo">CANS Hospital</div>
                <div className="doctor-info">
                    <span onClick={handleDoctorNameClick} className="doctor-name">
                        {`${user.firstName} ${user.lastName}`}
                    </span>
                </div>
                <button className="logoutBtn" onClick={handleLogout}>Logout</button>
            </nav>

            <div className="container">
                <h1>Your Appointments</h1>
                <table className="appointments-table">
                    <thead>
                        <tr >
                            <th onClick={sortAppointmentsByDate} style={{ cursor: 'pointer' }}>
                                Date {sortOrder === 'asc' ? '▲' : '▼'}
                            </th>
                            <th>Description</th>
                            <th>Patient Name</th>
                            <th>Phone No.</th>
                            <th style={{paddingLeft:"5rem"}}>Prescription</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.length > 0 ? (
                            appointments.map((appointment) => (
                                <tr key={appointment._id} onClick={() => handleRowClick(appointment)} className="clickable-row">
                                    <td>{new Date(appointment.appointment_date).toLocaleDateString()}</td>
                                    <td>{appointment.address}</td>
                                    <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                                    <td>{appointment.phone}</td>
                                    <td>
                                        <button
                                            style={{
                                                color: '#fff',
                                                textDecoration: 'none',
                                                backgroundColor: '#0088cc',
                                                padding: '5px 10px',
                                                borderRadius: '5px',
                                                margin: '5px 0',
                                                fontSize: '12px',
                                                marginRight: "10px",
                                                border:"none"
                                            }}
                                            onClick={() => handleOpenPrescriptionEditor(appointment)}
                                        >
                                            Write Prescription
                                        </button>
                                        <button
                                            style={{
                                                color: '#fff',
                                                textDecoration: 'none',
                                                backgroundColor: '#28a745',
                                                padding: '5px 10px',
                                                borderRadius: '5px',
                                                margin: '5px 0',
                                                fontSize: '12px',
                                                border:"none"
                                            }}
                                            onClick={() => handleOpenPrescriptionModal(appointment)}
                                        >
                                            View Refill Requests
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No appointments found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {showVideoCall && (
                <div className="modal-backdrop" onClick={handleCloseVideoCall}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 className="modal-title">Video Call</h2>
                            <button className="modal-close" onClick={handleCloseVideoCall}>×</button>
                        </div>
                        <div className="modal-content">
                            <ZegoCall 
                                roomID={Math.floor(Math.random() * 10000) + ""} 
                                userID={user._id} 
                                userName={`${user.firstName} ${user.lastName}`} 
                                isHost={true} 
                            />
                        </div>
                        <div className="modal-footer">
                            <button className="button" onClick={handleCloseVideoCall}>Close</button>
                        </div>
                    </div>
                </div>
            )}

          
            {/* Doctor Info Modal */}
            {showDoctorInfo && (
                <div className="modal-backdrop" onClick={handleCloseModal}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 className="modal-title">Doctor Information</h2>
                            <button className="modal-close" onClick={handleCloseModal}>×</button>
                        </div>
                        <div className="modal-content">
                            <img src={user.docAvatar.url} alt="Doctor Avatar" className="doctor-avatar" />
                            <p><strong>Name:</strong> {`${user.firstName} ${user.lastName}`}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Phone:</strong> {user.phone}</p>
                            <p><strong>Specialization:</strong> {user.department}</p>
                            <p><strong>Qualifications:</strong> {user.nic}</p>
                        </div>
                        <div className="modal-footer">
                            <button className="button" onClick={handleCloseModal}>Close</button>
                        </div>
                    </div>
                </div>
            )}

              {/* Appointment Details Modal */}
              {selectedAppointment && (
                <div className="modal-backdrop" onClick={handleCloseModal}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 className="modal-title">Appointment Details</h2>
                            <button className="modal-close" onClick={handleCloseModal}>×</button>
                        </div>
                        <div className="modal-content">
                            <p><strong>Date:</strong> {selectedAppointment.appointment_date.substring(0, 16)}</p>
                            <p><strong>Description:</strong> {selectedAppointment.address}</p>
                            <p><strong>Patient Name:</strong> {`${selectedAppointment.firstName} ${selectedAppointment.lastName}`}</p>
                            <p><strong>Phone:</strong> {selectedAppointment.phone}</p>
                            <p><strong>Status:</strong> {selectedAppointment.status}</p>
                        </div>
                        <div className="modal-footer">
                            <button className="button" onClick={handleCloseModal}>Close</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Prescription Editor Modal */}
            <Modal
                isOpen={isPrescriptionEditorOpen}
                onRequestClose={handleClosePrescriptionEditor}
                contentLabel="Prescription Editor"
                ariaHideApp={false}
                className="modal"
                overlayClassName="modal-backdrop"
            >
                <div className="modal-header">     
                    <h2 className="modal-title">Edit Prescription</h2>
                    <button onClick={handleClosePrescriptionEditor} className="modal-close">X</button>
                </div>
                <div className="modal-content">
                    <textarea
                        value={doctorNotes}
                        onChange={(e) => setDoctorNotes(e.target.value)}
                        placeholder="Doctor's Notes"
                    /> 
                    <textarea
                        value={prescription}
                        onChange={(e) => setPrescription(e.target.value)}
                        placeholder="Write Prescription"
                    />
                </div>
                <div className="modal-footer" style={{gap:"10px"}}>
                    <button className="button" onClick={handleSavePrescription}>Save</button>
                    <button className="button" onClick={handleClosePrescriptionEditor}>Close</button>
                </div>
            </Modal>

            {/* Prescription Refill Modal */}
            {selectedAppointment && (
                <Modal
                    isOpen={isRefillModalOpen}
                    onRequestClose={handleClosePrescriptionModal}
                    className="modal"
                    overlayClassName="modal-backdrop"
                >
                    <div className="modal-header">
                        <h2 className="modal-title">Refill Request</h2>
                        <button className="modal-close" onClick={handleClosePrescriptionModal}>X</button>
                    </div>
                    <div className="modal-content">
                        <textarea
                            value={refillRequest || "No refill requests available"}
                            readOnly
                        />
                    </div>
                    <div className="modal-footer">
                        <button className="button" onClick={handleClosePrescriptionModal}>Close</button>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default DoctorAppointments;
