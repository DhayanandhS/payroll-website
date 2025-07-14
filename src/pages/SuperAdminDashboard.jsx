import React from 'react';
import { useEffect, useState } from 'react';
import DashboardNetPay from '../components/dashboard/DashboardNetPay';
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
    <div className="payroll-summary-box">
      <div className="payroll-summary-overlay"/>
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
          <h3><DashboardNetPay/></h3>
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
  );
}

export default SuperAdminDashboard;
