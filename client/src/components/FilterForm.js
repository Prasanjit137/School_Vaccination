import React from 'react';

const FilterForm = ({ filters, onChange, onGenerate, onDownload, showDownload }) => {
  return (
    <div className="mb-4 p-3 bg-light rounded shadow-sm">
      <div className="row g-3">
        <div className="col-md-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={filters.name}
            onChange={onChange}
            className="form-control"
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            name="class"
            placeholder="Class"
            value={filters.class}
            onChange={onChange}
            className="form-control"
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            name="studentId"
            placeholder="Student ID"
            value={filters.studentId}
            onChange={onChange}
            className="form-control"
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            name="vaccinationName"
            placeholder="Vaccine Name"
            value={filters.vaccinationName}
            onChange={onChange}
            className="form-control"
          />
        </div>
        <div className="col-md-4">
          <input
            type="date"
            name="vaccinationDate"
            value={filters.vaccinationDate}
            onChange={onChange}
            className="form-control"
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            name="vaccinationStatus"
            placeholder="Vaccination Status"
            value={filters.vaccinationStatus}
            onChange={onChange}
            className="form-control"
          />
        </div>
      </div>

      <div className="mt-4 d-flex gap-3 flex-wrap">
        <button onClick={onGenerate} className="btn btn-primary">
          Generate Report
        </button>
        {showDownload && (
          <button onClick={onDownload} className="btn btn-success">
            Download CSV
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterForm;