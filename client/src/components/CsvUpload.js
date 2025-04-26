import React from 'react';

const CsvUpload = ({ csvFile, setCsvFile, handleCsvUpload }) => (
  <div className="card p-4 mb-4 shadow-sm">
    <h2 className="h5 mb-4 text-primary">Bulk Upload via CSV</h2>
    <input
      type="file"
      accept=".csv"
      onChange={(e) => setCsvFile(e.target.files[0])}
      className="form-control mb-3"
    />
    <button
      onClick={handleCsvUpload}
      className="btn btn-primary w-100"
      disabled={!csvFile}
    >
      Upload CSV
    </button>
  </div>
);

export default CsvUpload;