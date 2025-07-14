import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import '../../styles/Dashboard.css';

function EmployeeDashboard() {
  const token = localStorage.getItem('token');
  let role = null;
  let employeeId = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.role;
      employeeId = decoded.employeeId; // Make sure this is included in your JWT
    } catch (err) {
      console.error('Invalid token');
    }
  }

  if (role !== 'EMPLOYEE') return <Navigate to="/login" replace />;

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-overlay" />
      <h2 className="dashboard-title">Welcome, Employee!</h2>

      <div className="manage-section">
        <Link to="/my-profile" className="manage-card">
          <i className="fas fa-user-circle"></i>
          <p>My Profile</p>
          <small className="manage-desc">View and update your profile</small>
        </Link>
        <Link to="/submit-leave" className="manage-card">
          <i className="fas fa-calendar-plus"></i>
          <p>Submit Leave</p>
          <small className="manage-desc">Request a new leave</small>
        </Link>
        <Link to="/my-leaves" className="manage-card">
          <i className="fas fa-calendar-check"></i>
          <p>My Leaves</p>
          <small className="manage-desc">View your leave requests</small>
        </Link>
        <Link to="/submit-timesheet" className="manage-card">
          <i className="fas fa-clock"></i>
          <p>Submit Timesheet</p>
          <small className="manage-desc">Log work hours</small>
        </Link>
        <Link to="/my-timesheets" className="manage-card">
          <i className="fas fa-clipboard-list"></i>
          <p>My Timesheets</p>
          <small className="manage-desc">View submitted timesheets</small>
        </Link>
        <Link to="/my-notifications" className="manage-card">
          <i className="fas fa-bell"></i>
          <p>Notifications</p>
          <small className="manage-desc">Check system updates</small>
        </Link>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
