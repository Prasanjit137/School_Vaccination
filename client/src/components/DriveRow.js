import React from 'react';

const DriveRow = ({ drive, handleEdit, handleDelete, enableChanges, isDriveEditable }) => (
  <tr>
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

export default DriveRow;