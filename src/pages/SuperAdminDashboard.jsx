import React from 'react';
import DashboardNetPay from '../components/dashboard/DashboardNetPay';
import { Link, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import useDashboardStats from '../hooks/useDashboardStats';
import '../styles/SuperAdminDashboard.css';
import PayrollSummaryDashboard from '../components/admin/PayrollSummaryDashboard';

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
    <>
      {/* Manage Cards */}
      <div className="admin-manage-section">
        <div className="manage-info">
          <h3>Admin Control Center</h3>
          <p>
            Welcome to your administrative dashboard. Here, you can efficiently
            manage users, employees, policies, and audit logs. Use the shortcuts
            on the right to instantly access key modules and streamline
            organizational operations.
          </p>
          <p>
            Stay informed and in control with centralized access to essential
            data and tools. Everything you need to maintain a seamless workflow
            is just a click away.
          </p>
          <p>
            • Monitor team activity and ensure compliance at every level.
            <br />
            • Respond to employee needs with speed and clarity.
            <br />
            • Keep your organization's data accurate, secure, and up to date.
            <br />• Improve efficiency with quick access to policy management
            and timesheet oversight.
          </p>
          <p>
            Let your dashboard be the command center where decisions are made,
            insights are gathered, and progress begins.
          </p>
        </div>

        <div className="admin-manager-right-cards">
          <Link to="/manage-users" className="admin-manage-card">
            <i className="fas fa-users"></i>
            <p>Manage Users</p>
            <small className="manage-desc">
              Add, update or remove platform users
            </small>
          </Link>
          <Link to="/manage-employees" className="admin-manage-card">
            <i className="fas fa-user-tie"></i>
            <p>Manage Employees</p>
            <small className="manage-desc">
              Handle employee records and status
            </small>
          </Link>
          <Link to="/policies" className="admin-manage-card">
            <i className="fas fa-file-alt"></i>
            <p>Manage Policies</p>
            <small className="manage-desc">
              Create or update policy documents
            </small>
          </Link>
          <Link to="/audit-logs" className="admin-manage-card">
            <i className="fas fa-clipboard-list"></i>
            <p>View Audit Logs</p>
            <small className="manage-desc">
              Track system actions and events
            </small>
          </Link>
          <Link to="/manage-leaves" className="admin-manage-card">
            <i className="fas fa-calendar-alt"></i>
            <p>Manage Leave Requests</p>
            <small className="manage-desc">
              Approve or reject employee leave applications
            </small>
          </Link>

          <Link to="/manage-timesheets" className="admin-manage-card">
            <i className="fas fa-clock"></i>
            <p>Manage Timesheets</p>
            <small className="manage-desc">
              Review and manage employee working timesheets
            </small>
          </Link>
          <Link to="/payroll_processor-dashboard" className="admin-manage-card">
            <i className="fas fa-users"></i>
            <p>Process Payrolls</p>
            <small className="manage-desc">
              Add, update or remove payrolls, benefits and timesheets of users
              and employees.
            </small>
          </Link>
        </div>
      </div>
      <div className="payroll-summary-box">
        <div className="payroll-summary-overlay" />
        <div className="summary-header">
          <div>
            <h4>
              Process Pay Run for May 2024{' '}
              <span className="badge-approved">APPROVED</span>
            </h4>
            <p>
              Pay your employees on <strong>31/05/2024</strong>. Record it here
              once you made the payment.
            </p>
          </div>
        </div>

        <div className="summary-stats">
          <div className="summary-item">
            <p className="summary-label">EMPLOYEES' NET PAY</p>
            <h3>
              <DashboardNetPay />
            </h3>
          </div>
          <div className="summary-item">
            <p className="summary-label">PAYMENT DATE</p>
            <h3>31 July 2024</h3>
          </div>
          <div className="summary-item">
            <p className="summary-label">NO. OF EMPLOYEES</p>
            <h3>{stats?.employees}</h3>
          </div>
          <div className="summary-item">
            <p className="summary-label">NO. OF USERS</p>
            <h3>{stats?.users}</h3>
          </div>
          <div className="summary-item">
            <p className="summary-label">NO. OF POLICIES</p>
            <h3>{stats?.policies}</h3>
          </div>
          <div className="summary-item">
            <p className="summary-label">NO. OF AUDIT-LOGS</p>
            <h3>{stats?.logs}</h3>
          </div>
        </div>
      </div>
      <PayrollSummaryDashboard />
    </>
  );
}

export default SuperAdminDashboard;
