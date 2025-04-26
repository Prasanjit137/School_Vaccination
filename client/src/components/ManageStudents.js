import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddStudentForm from './AddStudentForm';
import CsvUpload from './CsvUpload';
import StudentTable from './StudentTable';
import PendingBookings from './PendingBookings';
import ToggleSwitch from './ToggleSwitch'; 

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: '',
    class: '',
    studentId: '',
    vaccinationName: '',
    vaccinationStatus: 'Not Vaccinated',
    vaccinationDate: '',
    bookingStatus: ''
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [bookingIndex, setBookingIndex] = useState(null);
  const [editData, setEditData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [csvFile, setCsvFile] = useState(null);
  const [enableChanges, setEnableChanges] = useState(false);

  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/students');
      setStudents(res.data);
    } catch (err) {
      console.error('Error fetching students:', err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAddStudent = async () => {
    const { name, class: studentClass, studentId } = newStudent;
    if (!name || !studentClass || !studentId) return alert('Please fill all fields!');
    const payload = { ...newStudent };
    if (payload.vaccinationStatus === 'Not Vaccinated') payload.vaccinationDate = null;
    try {
      await axios.post('http://localhost:5000/api/students', payload);
      setNewStudent({ name: '', class: '', studentId: '' });
      fetchStudents();
    } catch (err) {
      console.error('Error adding student:', err);
    }
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setBookingIndex(null);
    setEditData({ ...students[index] });
  };

  const handleBookClick = (index) => {
    setBookingIndex(index);
    setEditingIndex(null);
    setEditData({ ...students[index] });
  };

  const handleSave = async () => {
    const { id, bookingStatus, vaccinationStatus } = editData;
    if ((bookingStatus === 'Pending' || !bookingStatus || bookingStatus === 'Not Approved') &&
      (!editData.name || !editData.class || !editData.studentId)) {
      return alert('Please fill all fields!');
    }
    if (bookingStatus === 'Approved' && vaccinationStatus !== 'Vaccinated') {
      return alert('You can only mark as Vaccinated.');
    }
    try {
      await axios.put(`http://localhost:5000/api/students/${id}`, editData);
      setEditingIndex(null);
      fetchStudents();
    } catch (err) {
      console.error('Error updating student:', err);
    }
  };

  const handleMarkAsVaccinated = async () => {
    try {
      await axios.put(`http://localhost:5000/api/students/vaccinationStatus/${editData.id}`, {
        ...editData,
        vaccinationStatus: 'Vaccinated'
      });
      setEditingIndex(null);
      fetchStudents();
    } catch (err) {
      console.error('Error marking vaccinated:', err);
    }
  };

  const handleVaccinationSave = async () => {
    const { vaccinationName, vaccinationDate, id } = editData;
    if (!vaccinationName || !vaccinationDate) return alert('Please fill all vaccination fields!');
    try {
      await axios.put(`http://localhost:5000/api/students/vaccination/${id}`, {
        vaccinationName,
        vaccinationDate,
        vaccinationStatus: 'Not Vaccinated',
        bookingStatus: 'Pending'
      });
      setBookingIndex(null);
      fetchStudents();
    } catch (err) {
      console.error('Error saving vaccination info:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      fetchStudents();
    } catch (err) {
      console.error('Error deleting student:', err);
    }
  };

  const handleCsvUpload = async () => {
    if (!csvFile) return alert('Please select a CSV file first!');
    const formData = new FormData();
    formData.append('file', csvFile);
    try {
      await axios.post('http://localhost:5000/api/students/upload-csv', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('CSV uploaded successfully!');
      setCsvFile(null);
      fetchStudents();
    } catch (err) {
      console.error('CSV upload error:', err);
      alert('Failed to upload CSV');
    }
  };

  const filteredStudents = students.filter((student) =>
    [student.name, student.studentId, student.class, student.vaccinationName, student.vaccinationStatus, student.bookingStatus]
      .some(field => field?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container p-5">
  <h2 className="mb-4 text-primary fw-semibold border-bottom pb-2 d-inline-block">
    <i className="bi bi-speedometer2 me-2"></i>Manage Students
  </h2>

  <ToggleSwitch enableChanges={enableChanges} setEnableChanges={setEnableChanges} />

  {enableChanges && (
    <div className="mt-4">
      <PendingBookings />
    </div>
  )}

  <div className="mt-5">
    <AddStudentForm
      newStudent={newStudent}
      setNewStudent={setNewStudent}
      handleAddStudent={handleAddStudent}
    />
  </div>

  <div className="mt-4">
    <CsvUpload
      csvFile={csvFile}
      setCsvFile={setCsvFile}
      handleCsvUpload={handleCsvUpload}
    />
  </div>

  <div className="mt-4">
    <input
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="form-control mb-4"
      style={{
        borderRadius: '0.375rem', 
        borderColor: '#ced4da', 
        padding: '0.375rem 0.75rem', 
      }}
    />
  </div>

  <div className="mt-4">
    <StudentTable
      students={filteredStudents}
      editingIndex={editingIndex}
      bookingIndex={bookingIndex}
      editData={editData}
      setEditData={setEditData}
      handleEditClick={handleEditClick}
      handleBookClick={handleBookClick}
      handleDelete={handleDelete}
      handleSave={handleSave}
      handleVaccinationSave={handleVaccinationSave}
      handleMarkAsVaccinated={handleMarkAsVaccinated}
    />
  </div>
</div>
  );
};

export default ManageStudents;