import React from 'react';

const ToggleSwitch = ({ enableChanges, setEnableChanges }) => (
  <div className="form-check form-switch mt-4 d-flex align-items-center">
    <input
      className="form-check-input"
      type="checkbox"
      id="enableChanges"
      checked={enableChanges}
      onChange={() => setEnableChanges(!enableChanges)}
      style={{
        width: '50px',
        height: '25px',
        borderRadius: '50px',
        transition: 'all 0.3s ease-in-out',
      }}
    />
    <label
      className="form-check-label ms-3"
      htmlFor="enableChanges"
      style={{
        fontWeight: '600',
        color: '#333',
        fontSize: '16px',
        transition: 'color 0.3s ease-in-out',
      }}
    >
      Enable Admin Changes
    </label>
  </div>
);

export default ToggleSwitch;