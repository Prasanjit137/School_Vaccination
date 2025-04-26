import React from 'react';

const DriveForm = ({
  form,
  setForm,
  editingId,
  setEditingId,
  drives,
  fetchDrives,
  enableChanges,
}) => {
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
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

      if (!isCreating) {
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

      await res.json();

      setForm({ vaccineName: '', date: '', doses: '', classes: '' });
      setEditingId(null);
      fetchDrives();
    } catch (err) {
      console.error('Error saving drive:', err);
    }
  };

  return (
    <div className="card p-4 mt-4 shadow-sm rounded-3">
      <h4 className="mb-4 text-primary fw-bold">
        {editingId !== null ? 'Edit Vaccination Drive' : 'Create Vaccination Drive'}
      </h4>
      <form onSubmit={handleSubmit}>
        {['vaccineName', 'date', 'doses', 'classes'].map((field) => (
          <div className="mb-3" key={field}>
            <label className="form-label">
              {field === 'vaccineName'
                ? 'Vaccine Name'
                : field === 'date'
                ? 'Date of Drive'
                : field === 'doses'
                ? 'Number of Available Doses'
                : 'Applicable Classes'}
            </label>
            <input
              type={field === 'date' ? 'date' : field === 'doses' ? 'number' : 'text'}
              name={field}
              className="form-control"
              value={form[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <div className="d-flex justify-content-start gap-3">
          <button type="submit" className="btn btn-primary px-4 py-2">
            {editingId !== null ? 'Update' : 'Create'}
          </button>
          {editingId !== null && (
            <button
              type="button"
              className="btn btn-secondary px-4 py-2"
              onClick={() => {
                setEditingId(null);
                setForm({ vaccineName: '', date: '', doses: '', classes: '' });
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default DriveForm;