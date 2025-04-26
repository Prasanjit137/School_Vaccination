import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Papa from 'papaparse';

import FilterForm from './FilterForm';
import ReportTable from './ReportTable';
import Pagination from './Pagination';

const Reports = () => {
  const [students, setStudents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    class: '',
    studentId: '',
    vaccinationName: '',
    vaccinationDate: '',
    vaccinationStatus: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/students');
      setStudents(res.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleGenerate = () => {
    const result = students.filter((s) => {
      return (
        (filters.name ? s.name.toLowerCase().includes(filters.name.toLowerCase()) : true) &&
        (filters.class ? s.class.toLowerCase().includes(filters.class.toLowerCase()) : true) &&
        (filters.studentId ? s.studentId.toLowerCase().includes(filters.studentId.toLowerCase()) : true) &&
        (filters.vaccinationName ? s.vaccinationName?.toLowerCase().includes(filters.vaccinationName.toLowerCase()) : true) &&
        (filters.vaccinationDate
          ? new Date(s.vaccinationDate).toISOString().split('T')[0] === filters.vaccinationDate
          : true) &&
        (filters.vaccinationStatus
          ? s.vaccinationStatus?.toLowerCase().includes(filters.vaccinationStatus.toLowerCase())
          : true)
      );
    });
    setFiltered(result);
    setCurrentPage(1);
  };

  const downloadCSV = () => {
    const csv = Papa.unparse(filtered);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'vaccination_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;
  const currentStudents = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / studentsPerPage);

  return (
    <div>
      <h3>Vaccination Reports</h3>

      <FilterForm
        filters={filters}
        onChange={handleFilterChange}
        onGenerate={handleGenerate}
        onDownload={downloadCSV}
        showDownload={filtered.length > 0}
      />

      {filtered.length > 0 ? (
        <>
          <ReportTable students={currentStudents} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <p>No data found. Please adjust filters and try again.</p>
      )}
    </div>
  );
};

export default Reports;
