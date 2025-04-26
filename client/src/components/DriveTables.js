import React from 'react';
import DriveRow from './DriveRow';

const DriveTables = ({ drives, handleEdit, handleDelete, enableChanges, isEditable }) => (
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
        {drives.length > 0 ? (
          drives.map((drive) => (
            <DriveRow
              key={drive.id}
              drive={drive}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              enableChanges={enableChanges}
              isDriveEditable={isEditable(drive.date)}
            />
          ))
        ) : (
          <tr>
            <td colSpan="5" className="text-center">
              No drives found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default DriveTables;