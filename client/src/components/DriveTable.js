import React from 'react';

const DriveNotices = ({ drives, onView }) => {
  return (
    <div className="mt-5">
      <h3 className="mb-4 text-primary fw-bold">
        Upcoming Vaccination Drives
      </h3>
      {drives.length > 0 ? (
        <div className="d-flex flex-column gap-4">
          {drives.map((drive) => (
            <div
              key={drive.id}
              className="card p-4 border-0 shadow-lg position-relative notice-card"
              style={{
                borderLeft: '6px solid #0d6efd',
                borderRadius: '1rem',
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="text-dark mb-0 fw-semibold">{drive.vaccine}</h5>
                <span className="badge bg-success fs-6">
                  {new Date(drive.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-muted mb-4">
                Ensure timely vaccination to stay protected. Click below for more details.
              </p>
              <div className="d-flex justify-content-end position-absolute" style={{ bottom: '1rem', right: '1.5rem' }}>
                <button
                  className="btn btn-outline-primary btn-sm rounded-pill px-4"
                  onClick={() => onView(drive)}
                >
                  View More
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info text-center shadow-sm p-4 rounded-3">
          No vaccination drives scheduled currently. Please check back later!
        </div>
      )}
    </div>
  );
};

export default DriveNotices;