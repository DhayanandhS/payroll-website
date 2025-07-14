import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ManagerDashboard.css';

const ManagerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <h2>👨‍🏫 Manager / Supervisor Dashboard</h2>
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card card-hover" onClick={() => navigate('/manage-leaves')}>
            <div className="card-body">
              <h5 className="card-title">📝 Manage Leave Requests</h5>
              <p className="card-text">Approve or reject leave requests submitted by employees.</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card card-hover" onClick={() => navigate('/manage-timesheets')}>
            <div className="card-body">
              <h5 className="card-title">⏱️ Manage Timesheets</h5>
              <p className="card-text">Review and approve employee work hours.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
