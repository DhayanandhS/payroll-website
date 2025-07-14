import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import useDashboardStats from '../hooks/useDashboardStats';
import '../styles/SuperAdminDashboard.css';

function SuperAdminDashboard() {
  const token = localStorage.getItem('token');
  const stats = useDashboardStats();
  let role = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.role;
    } catch (err) {
      console.error('Invalid token');
    }
  }

  if (role !== 'SUPER_ADMIN') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-overlay" />

      <h2 className="dashboard-title">Welcome back, Admin!</h2>

      {/* Analytics Section */}
      <div className="dashboard-cards">
        <div className="stat-card">
          <div className="stat-icon bg-blue">
            <i className="fas fa-users"></i>
          </div>
          <div>
            <p className="stat-label">Users</p>
            <h3>{stats?.users}</h3>
            <span className="stat-positive">+12%</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon bg-green">
            <i className="fas fa-user-tie"></i>
          </div>
          <div>
            <p className="stat-label">Employees</p>
            <h3>{stats?.employees}</h3>
            <span className="stat-negative">-3%</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon bg-yellow">
            <i className="fas fa-file-alt"></i>
          </div>
          <div>
            <p className="stat-label">Policies</p>
            <h3>{stats?.policies}</h3>
            <span className="stat-positive">+7%</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon bg-red">
            <i className="fas fa-shield-alt"></i>
          </div>
          <div>
            <p className="stat-label">Audit Logs</p>
            <h3>{stats?.logs}</h3>
            <span className="stat-positive">+2%</span>
          </div>
        </div>
      </div>

      {/* Manage Cards */}
      <div className="manage-section">
        <Link to="/manage-users" className="manage-card">
          <i className="fas fa-users"></i>
          <p>Manage Users</p>
          <small className="manage-desc">
            Add, update or remove platform users
          </small>
        </Link>
        <Link to="/manage-employees" className="manage-card">
          <i className="fas fa-user-tie"></i>
          <p>Manage Employees</p>
          <small className="manage-desc">
            Handle employee records and status
          </small>
        </Link>
        <Link to="/policies" className="manage-card">
          <i className="fas fa-file-alt"></i>
          <p>Manage Policies</p>
          <small className="manage-desc">
            Create or update policy documents
          </small>
        </Link>
        <Link to="/audit-logs" className="manage-card">
          <i className="fas fa-clipboard-list"></i>
          <p>View Audit Logs</p>
          <small className="manage-desc">Track system actions and events</small>
        </Link>
      </div>
    </div>
  );
}

export default SuperAdminDashboard;
