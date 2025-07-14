import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import '../styles/EmployeeDashboard.css';

function EmployeeDashboard() {
  const token = localStorage.getItem('token');
  let role = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.role;
    } catch (err) {
      console.error('Invalid token');
    }
  }

  if (role !== 'EMPLOYEE') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="employee-dashboard-wrapper">
      <div className="dashboard-overlay" />
      <h2 className="dashboard-title">Welcome back, Employee!</h2>

      {/* Manage Section */}
      <div className="manage-section">
        <Link to="/my-profile" className="manage-card">
          <i className="fas fa-id-badge"></i>
          <p>My Profile</p>
          <small className="manage-desc">View and update your personal info</small>
        </Link>

        <Link to="/submit-leave" className="manage-card">
          <i className="fas fa-calendar-check"></i>
          <p>Leave Requests</p>
          <small className="manage-desc">Apply and track your leave status</small>
        </Link>

        <Link to="/submit-timesheet" className="manage-card">
          <i className="fas fa-clock"></i>
          <p>Timesheets</p>
          <small className="manage-desc">Log your working hours</small>
        </Link>

        <Link to="/notifications" className="manage-card">
          <i className="fas fa-bell"></i>
          <p>Notifications</p>
          <small className="manage-desc">Read latest updates and messages</small>
        </Link>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
