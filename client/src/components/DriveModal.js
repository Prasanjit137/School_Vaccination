import React from 'react';

const DriveModal = ({ drive, onClose }) => (
  <div
    className="modal fade show"
    style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
    tabIndex="-1"
    role="dialog"
  >
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content rounded-4 shadow border-0">
        <div className="modal-header bg-light text-dark border-bottom rounded-top-4">
          <h5 className="modal-title d-flex align-items-center">
            <i className="bi bi-info-circle me-2 fs-5 text-secondary"></i> Drive Details
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body py-4 px-4">
          <div className="row gy-3">
            <div className="col-12">
              <i className="bi bi-shield-plus me-2 text-warning fs-5"></i>
              <strong className="me-2">Name of the Drive:</strong>
              <span className="text-muted">{drive.vaccine}</span>
            </div>

            <div className="col-12">
              <i className="bi bi-calendar-event me-2 text-secondary fs-5"></i>
              <strong className="me-2">Date of Drive:</strong>
              <span className="text-muted">
                {new Date(drive.date).toLocaleDateString()}
              </span>
            </div>

            <div className="col-12">
              <i className="bi bi-syringe me-2 text-danger fs-5"></i>
              <strong className="me-2">Number of Doses:</strong>
              <span className="text-muted">{drive.doses}</span>
            </div>

            <div className="col-12">
              <i className="bi bi-people-fill me-2 text-success fs-5"></i>
              <strong className="me-2">Alotted for Class:</strong>
              <span className="text-muted">{drive.classes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default DriveModal;