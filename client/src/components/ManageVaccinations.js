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
      const res = await fetch('http://localhost:5000/vaccination-drives', {
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
          await fetch(`http://localhost:5000/vaccination-drives/${id}`, {
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
/*
import React, { useEffect, useState } from 'react';

const ManageVaccinations = () => {
  const [form, setForm] = useState({
    vaccineName: '',
    date: '',
    doses: '',
    classes: '',
  });

  const [drives, setDrives] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [enableChanges, setEnableChanges] = useState(false); // toggle

  useEffect(() => {
    fetchDrives();
  }, []);

  const fetchDrives = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:5000/vaccination-drives', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setDrives(data);
    } catch (err) {
      console.error('Failed to fetch drives:', err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const selectedDate = new Date(form.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const minAllowedDate = new Date();
    minAllowedDate.setDate(today.getDate() + 15);

    const isCreating = editingId === null;
    const isDateChanged = drives.find((d) => d.id === editingId)?.date !== form.date;

    if (!enableChanges && (isCreating || isDateChanged) && selectedDate < minAllowedDate) {
      alert('Vaccination drive date must be at least 15 days from today.');
      return;
    }

    const payload = {
      vaccine: form.vaccineName,
      date: form.date,
      doses: parseInt(form.doses),
      classes: form.classes,
    };

    try {
      let url = 'http://localhost:5000/vaccination-drives';
      let method = 'POST';

      if (editingId !== null) {
        url += `/${editingId}`;
        method = 'PUT';
      }

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log(data.message);

      setForm({ vaccineName: '', date: '', doses: '', classes: '' });
      setEditingId(null);
      fetchDrives();
    } catch (err) {
      console.error('Error saving drive:', err);
    }
  };

  const handleEdit = (drive) => {
    setForm({
      vaccineName: drive.vaccine,
      date: drive.date,
      doses: drive.doses,
      classes: drive.classes,
    });
    setEditingId(drive.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this drive?')) return;

    const token = localStorage.getItem('token');
    try {
      await fetch(`http://localhost:5000/vaccination-drives/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchDrives();
    } catch (err) {
      console.error('Error deleting drive:', err);
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
      <h2>Vaccination Drive Management</h2>

      <div className="form-check form-switch mt-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="enableChanges"
          checked={enableChanges}
          onChange={() => setEnableChanges(!enableChanges)}
        />
        <label className="form-check-label" htmlFor="enableChanges">
          Enable Changes
        </label>
      </div>

      <div className="card p-3 mt-4">
        <h4>{editingId !== null ? 'Edit Drive' : 'Create Vaccination Drive'}</h4>
        <form onSubmit={handleCreateOrUpdate}>
          <div className="mb-3">
            <label className="form-label">Vaccine Name</label>
            <input
              type="text"
              name="vaccineName"
              className="form-control"
              value={form.vaccineName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Date of Drive</label>
            <input
              type="date"
              name="date"
              className="form-control"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Number of Available Doses</label>
            <input
              type="number"
              name="doses"
              className="form-control"
              value={form.doses}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Applicable Classes</label>
            <input
              type="text"
              name="classes"
              className="form-control"
              value={form.classes}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            {editingId !== null ? 'Update' : 'Create'}
          </button>
          {editingId !== null && (
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => {
                setEditingId(null);
                setForm({ vaccineName: '', date: '', doses: '', classes: '' });
              }}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className="card mt-5 p-3">
        <h4>Upcoming Vaccination Drives</h4>
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Vaccine</th>
              <th>Date</th>
              <th>Doses</th>
              <th>Classes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {drives.map((drive) => {
              const isDriveEditable = isEditable(drive.date);
              return (
                <tr key={drive.id}>
                  <td>{drive.vaccine}</td>
                  <td>{new Date(drive.date).toLocaleDateString()}</td>
                  <td>{drive.doses}</td>
                  <td>{drive.classes}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(drive)}
                      disabled={!enableChanges && !isDriveEditable}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(drive.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
            {drives.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  No drives found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageVaccinations;


*/
/*
import React, { useEffect, useState } from 'react';

const ManageVaccinations = () => {
  const [form, setForm] = useState({
    vaccineName: '',
    date: '',
    doses: '',
    classes: '',
  });

  const [drives, setDrives] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchDrives();
  }, []);

  const fetchDrives = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:5000/vaccination-drives', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setDrives(data);
    } catch (err) {
      console.error('Failed to fetch drives:', err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const selectedDate = new Date(form.date);
    const today = new Date();
    const minAllowedDate = new Date();
    minAllowedDate.setDate(today.getDate() + 15);

    const originalDrive = drives.find((d) => d.id === editingId);
    const isDateChanged = editingId !== null && originalDrive && originalDrive.date !== form.date;
    const isCreating = editingId === null;

    if ((isCreating || isDateChanged) && selectedDate < minAllowedDate) {
      alert('Vaccination drive date must be at least 15 days from today.');
      return;
    }

    const payload = {
      vaccine: form.vaccineName,
      date: form.date,
      doses: parseInt(form.doses),
      classes: form.classes,
    };

    try {
      let url = 'http://localhost:5000/vaccination-drives';
      let method = 'POST';

      if (editingId !== null) {
        url += `/${editingId}`;
        method = 'PUT';
      }

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log(data.message);

      setForm({ vaccineName: '', date: '', doses: '', classes: '' });
      setEditingId(null);
      fetchDrives();
    } catch (err) {
      console.error('Error saving drive:', err);
    }
  };

  const handleEdit = (drive) => {
    setForm({
      vaccineName: drive.vaccine,
      date: drive.date,
      doses: drive.doses,
      classes: drive.classes,
    });
    setEditingId(drive.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this drive?')) return;

    const token = localStorage.getItem('token');
    try {
      await fetch(`http://localhost:5000/vaccination-drives/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchDrives();
    } catch (err) {
      console.error('Error deleting drive:', err);
    }
  };

  const isDateWithin15Days = (date) => {
    const driveDate = new Date(date);
    const today = new Date();
    const threshold = new Date();
    threshold.setDate(today.getDate() + 15);
    return driveDate < threshold;
  };

  return (
    <div className="container mt-4">
      <h2>Vaccination Drive Management</h2>

      <div className="card p-3 mt-4">
        <h4>{editingId !== null ? 'Edit Drive' : 'Create Vaccination Drive'}</h4>
        <form onSubmit={handleCreateOrUpdate}>
          <div className="mb-3">
            <label className="form-label">Vaccine Name</label>
            <input
              type="text"
              name="vaccineName"
              className="form-control"
              value={form.vaccineName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Date of Drive</label>
            <input
              type="date"
              name="date"
              className="form-control"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Number of Available Doses</label>
            <input
              type="number"
              name="doses"
              className="form-control"
              value={form.doses}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Applicable Classes</label>
            <input
              type="text"
              name="classes"
              className="form-control"
              value={form.classes}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            {editingId !== null ? 'Update' : 'Create'}
          </button>
          {editingId !== null && (
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => {
                setEditingId(null);
                setForm({ vaccineName: '', date: '', doses: '', classes: '' });
              }}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className="card mt-5 p-3">
        <h4>Upcoming Vaccination Drives</h4>
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Vaccine</th>
              <th>Date</th>
              <th>Doses</th>
              <th>Classes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {drives.map((drive) => {
              const isTooClose = isDateWithin15Days(drive.date);
              return (
                <tr key={drive.id}>
                  <td>{drive.vaccine}</td>
                  <td>{new Date(drive.date).toLocaleDateString()}</td>
                  <td>{drive.doses}</td>
                  <td>{drive.classes}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(drive)}
                      disabled={isTooClose}
                      title={isTooClose ? "Cannot edit a drive scheduled in less than 15 days" : "Edit"}
                    >
                      Edit
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(drive.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
            {drives.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">No drives found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageVaccinations;

*/