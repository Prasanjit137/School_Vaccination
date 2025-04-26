import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PendingBookings = () => {
  const [pendingBookings, setPendingBookings] = useState([]);

  // Fetch pending bookings
  const fetchPendingBookings = async () => {
    try {
      const res = await axios.get('http://localhost:5000/students');
      const pending = res.data.filter(student => student.bookingStatus === 'Pending');
      setPendingBookings(pending);
    } catch (err) {
      console.error('Error fetching pending bookings:', err);
    }
  };

  useEffect(() => {
    fetchPendingBookings();
  }, []);

  // Approve booking
  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:5000/booking/${id}`, {
        bookingStatus: 'Approved'
      });
      fetchPendingBookings(); // Refresh list
    } catch (err) {
      console.error('Error approving booking:', err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary">Pending Bookings</h2>
      {pendingBookings.length === 0 ? (
        <div className="alert alert-info">No pending bookings.</div>
      ) : (
        <table className="table table-striped table-hover mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Class</th>
              <th>Student ID</th>
              <th>Vaccination Name</th>
              <th>Vaccination Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingBookings.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.class}</td>
                <td>{student.studentId}</td>
                <td>{student.vaccinationName}</td>
                <td>{student.vaccinationDate}</td>
                <td>
                  <span className="badge bg-warning text-dark">{student.bookingStatus}</span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => handleApprove(student.id)}
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PendingBookings;
