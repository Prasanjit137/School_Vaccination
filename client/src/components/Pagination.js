import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="mt-3 d-flex justify-content-center align-items-center">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="btn btn-outline-primary mx-2"
      >
        Prev
      </button>
      <span className="mx-2">
        Page {currentPage} of {totalPages}
      </span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="btn btn-outline-primary mx-2"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;