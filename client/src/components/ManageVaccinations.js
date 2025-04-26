import React, { useEffect, useState } from 'react';
import DriveForm from './DriveForm';
import DriveTable from './DriveTables';
import ToggleSwitch from './ToggleSwitch';

const ManageVaccinations = () => {
  const [form, setForm] = useState({
    vaccineName: '',
    date: '',
    doses: '',
    classes: '',
  });
  const [drives, setDrives] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [enableChanges, setEnableChanges] = useState(false);

  useEffect(() => {
    fetchDrives();
  }, []);

  const fetchDrives = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:5000/api/drives', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setDrives(data);
    } catch (err) {
      console.error('Failed to fetch drives:', err);
    }
  };

  const isEditable = (dateStr) => {
    const driveDate = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const minDate = new Date();
    minDate.setDate(today.getDate() + 15);
    return driveDate >= minDate;
  };

  return (
    <div className="container mt-4">
  <h2 className="text-primary mb-4">Vaccination Drive Management</h2>

  <ToggleSwitch
    enableChanges={enableChanges}
    setEnableChanges={setEnableChanges}
  />

  <div className="mt-4">
    <DriveForm
      form={form}
      setForm={setForm}
      editingId={editingId}
      setEditingId={setEditingId}
      drives={drives}
      fetchDrives={fetchDrives}
      enableChanges={enableChanges}
    />
  </div>

  <div className="mt-5">
    <DriveTable
      drives={drives}
      handleEdit={(drive) => {
        setForm({
          vaccineName: drive.vaccine,
          date: drive.date,
          doses: drive.doses,
          classes: drive.classes,
        });
        setEditingId(drive.id);
      }}
      handleDelete={async (id) => {
        if (!window.confirm('Are you sure you want to delete this drive?')) return;
        const token = localStorage.getItem('token');
        try {
          await fetch(`http://localhost:5000/api/drives/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
          });
          fetchDrives();
        } catch (err) {
          console.error('Error deleting drive:', err);
        }
      }}
      enableChanges={enableChanges}
      isEditable={isEditable}
    />
  </div>
</div>
  );
};

export default ManageVaccinations;