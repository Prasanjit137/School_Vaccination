import React from 'react';

const StudentRow = ({
  student,
  index,
  isEditing,
  isBooking,
  editData,
  setEditData,
  handleSave,
  handleVaccinationSave,
  handleMarkAsVaccinated,
  handleEditClick,
  handleBookClick,
  handleDelete,
}) => {
  if (!student) return null;
  if ((isEditing || isBooking) && !editData) return null;

  const editableFields =
    editData &&
    (!editData.bookingStatus ||
      editData.bookingStatus === 'Pending' ||
      editData.bookingStatus === 'Not Approved');

  const handleCancel = () => {
    setEditData(null);
  };

  return (
    <tr>
      {isEditing ? (
        <>
          <td className="border p-2">
            {editableFields ? (
              <input
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
                className="border p-1 rounded w-full"
              />
            ) : (
              editData.name
            )}
          </td>
          <td className="border p-2">
            {editableFields ? (
              <input
                value={editData.class}
                onChange={(e) =>
                  setEditData({ ...editData, class: e.target.value })
                }
                className="border p-1 rounded w-full"
              />
            ) : (
              editData.class
            )}
          </td>
          <td className="border p-2">
            {editableFields ? (
              <input
                value={editData.studentId}
                onChange={(e) =>
                  setEditData({ ...editData, studentId: e.target.value })
                }
                className="border p-1 rounded w-full"
              />
            ) : (
              editData.studentId
            )}
          </td>
          <td className="border p-2">{editData.bookingStatus}</td>
          <td className="border p-2">{editData.vaccinationName}</td>
          <td className="border p-2">
            {editData.vaccinationDate
              ? new Date(editData.vaccinationDate).toLocaleDateString()
              : '—'}
          </td>
          <td className="border p-2">
            {editData.bookingStatus === 'Approved' &&
            editData.vaccinationStatus !== 'Vaccinated' ? (
              <button
                onClick={handleMarkAsVaccinated}
                className="bg-blue-600 text-white px-2 py-1 rounded"
              >
                Mark as Vaccinated
              </button>
            ) : (
              editData.vaccinationStatus
            )}
          </td>
          <td className="border p-2 space-x-2">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-2 py-1 rounded"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white px-2 py-1 rounded"
            >
              Cancel
            </button>
          </td>
        </>
      ) : isBooking ? (
        <>
          <td className="border p-2">{student.name}</td>
          <td className="border p-2">{student.class}</td>
          <td className="border p-2">{student.studentId}</td>
          <td className="border p-2">{student.bookingStatus}</td>
          <td className="border p-2">
            <input
              value={editData.vaccinationName || ''}
              onChange={(e) =>
                setEditData({ ...editData, vaccinationName: e.target.value })
              }
              className="border p-1 rounded w-full"
            />
          </td>
          <td className="border p-2">
            <input
              type="date"
              value={editData.vaccinationDate || ''}
              onChange={(e) =>
                setEditData({ ...editData, vaccinationDate: e.target.value })
              }
              className="border p-1 rounded w-full"
            />
          </td>
          <td className="border p-2">
            {editData.vaccinationStatus || 'Not Vaccinated'}
          </td>
          <td className="border p-2 space-x-2">
            <button
              onClick={handleVaccinationSave}
              className="bg-blue-600 text-white px-2 py-1 rounded"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white px-2 py-1 rounded"
            >
              Cancel
            </button>
          </td>
        </>
      ) : (
        <>
          <td className="border p-2">{student.name}</td>
          <td className="border p-2">{student.class}</td>
          <td className="border p-2">{student.studentId}</td>
          <td className="border p-2">{student.bookingStatus}</td>
          <td className="border p-2">{student.vaccinationName}</td>
          <td className="border p-2">
            {student.vaccinationDate
              ? new Date(student.vaccinationDate).toLocaleDateString()
              : '—'}
          </td>
          <td className="border p-2">{student.vaccinationStatus}</td>
          <td className="border p-2 space-x-2">
            <button
              onClick={() => handleEditClick(index)}
              className="btn btn-sm btn-warning"
              disabled={
                student.bookingStatus === 'Approved' &&
                student.vaccinationStatus === 'Vaccinated'
              }
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(student.id)}
              className="btn btn-sm btn-danger"
            >
              Delete
            </button>
            <button
              onClick={() => handleBookClick(index)}
              className="btn btn-sm btn-success"
              disabled={
                student.bookingStatus === 'Approved' ||
                student.bookingStatus === 'Pending'
              }
            >
              Book Drive
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

export default StudentRow;