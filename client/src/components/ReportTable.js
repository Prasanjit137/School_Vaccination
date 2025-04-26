import React from 'react';

const ReportTable = ({ students }) => {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Student ID</th>
            <th>Vaccine Name</th>
            <th>Vaccination Date</th>
            <th>Vaccination Status</th>
            <th>Booking Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, i) => (
            <tr key={i}>
              <td>{s.name}</td>
              <td>{s.class}</td>
              <td>{s.studentId}</td>
              <td>{s.vaccinationName}</td>
              <td>{s.vaccinationDate ? new Date(s.vaccinationDate).toISOString().split('T')[0] : 'N/A'}</td>
              <td>{s.vaccinationStatus}</td>
              <td>{s.bookingStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;