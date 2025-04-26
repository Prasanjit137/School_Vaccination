import React from 'react';

const AddStudentForm = ({ newStudent, setNewStudent, handleAddStudent }) => (
  <div className="card p-4 mb-4 shadow-sm">
    <h2 className="h5 mb-4 text-primary">Add New Student</h2>
    <div className="row g-3">
      <div className="col-12 col-md-4">
        <input
          placeholder="Name"
          value={newStudent.name}
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
          className="form-control"
        />
      </div>
      <div className="col-12 col-md-4">
        <input
          placeholder="Class"
          value={newStudent.class}
          onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
          className="form-control"
        />
      </div>
      <div className="col-12 col-md-4">
        <input
          placeholder="Student ID"
          value={newStudent.studentId}
          onChange={(e) => setNewStudent({ ...newStudent, studentId: e.target.value })}
          className="form-control"
        />
      </div>
    </div>
    <button onClick={handleAddStudent} className="btn btn-primary w-100 mt-4">
      Add Student
    </button>
  </div>
);

export default AddStudentForm;