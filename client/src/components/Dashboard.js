import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StatCard from './StatCard';
import ProgressCircle from './ProgressCircle';
import VaccineBreakdownChart from './VaccineBreakdownChart';
import DriveTable from './DriveTable';
import DriveModal from './DriveModal';

const Dashboard = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [vaccinatedCount, setVaccinatedCount] = useState(0);
  const [vaccineStats, setVaccineStats] = useState([]);
  const [drives, setDrives] = useState([]);
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, drivesRes] = await Promise.all([
          axios.get('http://localhost:5000/students'),
          axios.get('http://localhost:5000/vaccination-drives', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }),
        ]);

        const students = studentsRes.data;
        const vaccinated = students.filter(s => s.vaccinationStatus === 'Vaccinated');

        setTotalStudents(students.length);
        setVaccinatedCount(vaccinated.length);

        const vaccineMap = {};
        vaccinated.forEach(student => {
          const name = student.vaccinationName;
          if (name) vaccineMap[name] = (vaccineMap[name] || 0) + 1;
        });
        setVaccineStats(Object.entries(vaccineMap).map(([vaccine, count]) => ({ vaccine, count })));

        const sortedDrives = drivesRes.data
          .filter(drive => {
            const today = new Date();
            const driveDate = new Date(drive.date);
            const timeDiff = driveDate - today;
            const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
            return daysDiff >= 0 && daysDiff <= 30;
          })
          .sort((a, b) => new Date(a.date) - new Date(b.date));
        setDrives(sortedDrives);

      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  const vaccinatedPercentage = totalStudents
    ? ((vaccinatedCount / totalStudents) * 100).toFixed(2)
    : 0;

  return (
    <div className="container mt-4">
<h2 className="mb-4 text-primary fw-semibold border-bottom pb-2 d-inline-block">
  <i className="bi bi-speedometer2 me-2"></i>Dashboard
</h2>

      <div className="row mt-4">
        <StatCard title="Total Students" value={totalStudents} />
        <StatCard title="Vaccinated Students" value={vaccinatedCount} />
        <StatCard title="Vaccination %" value={`${vaccinatedPercentage}%`} />
      </div>

      <div className="row mt-4">
        <ProgressCircle
          percentage={vaccinatedPercentage}
          vaccinatedCount={vaccinatedCount}
          totalStudents={totalStudents}
        />
      </div>

      <VaccineBreakdownChart data={vaccineStats} />

      <DriveTable drives={drives} onView={(drive) => {
        setSelectedDrive(drive);
        setShowModal(true);
      }} />

      {showModal && selectedDrive && (
        <DriveModal drive={selectedDrive} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default Dashboard;