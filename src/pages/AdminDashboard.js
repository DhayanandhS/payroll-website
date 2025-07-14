import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import useDashboardStats from '../hooks/useDashboardStats';
import '../styles/SuperAdminDashboard.css'; // Reuse same styles

function AdminDashboard() {
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

  // 🚫 Redirect if not ADMIN_HR
  if (role !== 'ADMIN_HR') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="dashboard-wrapper">
      <div className="admin-dashboard-overlay" />

      <h2 className="dashboard-title">Welcome back, Admin HR!</h2>

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

      {/* Manage Section */}
      <div className="manage-section">
        <Link to="/manage-users" className="manage-card">
          <i className="fas fa-users"></i>
          <p>Manage Users</p>
          <small className="manage-desc">
            Create, update, or remove user accounts and assign roles.
          </small>
        </Link>

        <Link to="/manage-employees" className="manage-card">
          <i className="fas fa-user-tie"></i>
          <p>Manage Employees</p>
          <small className="manage-desc">
            Add new employees, view details, and manage department info.
          </small>
        </Link>

        <Link to="/policies" className="manage-card">
          <i className="fas fa-file-alt"></i>
          <p>View Policies</p>
          <small className="manage-desc">
            Review and edit payroll and leave policies for the organization.
          </small>
        </Link>

        <Link to="/audit-logs" className="manage-card">
          <i className="fas fa-clipboard-list"></i>
          <p>Audit Logs</p>
          <small className="manage-desc">
            Track system activities and user actions for security auditing.
          </small>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
