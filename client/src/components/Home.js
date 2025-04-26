import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import ManageStudents from './ManageStudents';
import ManageVaccinations from './ManageVaccinations';
import Reports from './Reports';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/home', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Unauthorized');
      } catch (err) {
        alert('Session expired. Please login again.');
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'students':
        return <ManageStudents />;
      case 'vaccinations':
        return <ManageVaccinations />;
      case 'reports':
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container-fluid bg-light">
      <div className="row">
        {/* Sidebar */}
        <div
          className="col-md-2 bg-white p-4 border-end shadow-sm vh-100 position-sticky top-0"
          style={{ zIndex: 1 }}
        >
          <h4 className="mb-4 text-primary fw-bold">Menu</h4>
          <ul className="nav flex-column">
            <li className="nav-item mb-3">
              <button
                className="btn btn-outline-primary w-100 text-start"
                onClick={() => setActiveSection('dashboard')}
              >
                Dashboard
              </button>
            </li>
            <li className="nav-item mb-3">
              <button
                className="btn btn-outline-primary w-100 text-start"
                onClick={() => setActiveSection('students')}
              >
                Manage Students
              </button>
            </li>
            <li className="nav-item mb-3">
              <button
                className="btn btn-outline-primary w-100 text-start"
                onClick={() => setActiveSection('vaccinations')}
              >
                Manage Vaccinations
              </button>
            </li>
            <li className="nav-item mb-3">
              <button
                className="btn btn-outline-primary w-100 text-start"
                onClick={() => setActiveSection('reports')}
              >
                Reports
              </button>
            </li>
            <li className="nav-item mt-5">
              <button className="btn btn-danger w-100" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-10 p-5 bg-light">
          <div className="container-fluid">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body">
                <h2 className="card-title mb-4 text-dark fw-semibold">
                  Welcome to the Vaccination Drive Portal
                </h2>
                <hr className="mb-4" />
                {renderSection()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;