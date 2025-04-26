import React from 'react';
import StudentRow from './StudentRow';

const StudentTable = ({
  students,
  editingIndex,
  bookingIndex,
  editData,
  setEditData,
  handleEditClick,
  handleBookClick,
  handleDelete,
  handleSave,
  handleVaccinationSave,
  handleMarkAsVaccinated
}) => (
  <div className="table-responsive mt-4">
    <table className="table table-bordered table-hover">
      <thead className="table-light">
        <tr>
          <th className="p-2">Name</th>
          <th className="p-2">Class</th>
          <th className="p-2">Student ID</th>
          <th className="p-2">Booking Status</th>
          <th className="p-2">Vaccination</th>
          <th className="p-2">Date</th>
          <th className="p-2">Status</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, index) => (
          <StudentRow
            key={student.id}
            student={student}
            index={index}
            isEditing={editingIndex === index}
            isBooking={bookingIndex === index}
            editData={editData}
            setEditData={setEditData}
            handleEditClick={handleEditClick}
            handleBookClick={handleBookClick}
            handleDelete={handleDelete}
            handleSave={handleSave}
            handleVaccinationSave={handleVaccinationSave}
            handleMarkAsVaccinated={handleMarkAsVaccinated}
          />
        ))}
      </tbody>
    </table>
  </div>
);

export default StudentTable;