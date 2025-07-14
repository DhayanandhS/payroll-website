// src/pages/PayrollProcessorDashboard.jsx
import React, { useState } from 'react';
import PayrollsTab from '../components/payroll/PayrollsTab';
import BenefitsTab from '../components/payroll/BenefitsTab';
import TimesheetsTab from '../components/payroll/TimesheetsTab';

const PayrollProcessorDashboard = () => {
  const [activeTab, setActiveTab] = useState('payrolls');

  const renderTab = () => {
    switch (activeTab) {
      case 'payrolls':
        return <PayrollsTab />;
      case 'benefits':
        return <BenefitsTab />;
      case 'timesheets':
        return <TimesheetsTab />;
      default:
        return <PayrollsTab />;
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Payroll Processor Dashboard</h2>

      <div className="btn-group mb-4" role="group">
        <button
          className={`btn btn-outline-primary ${activeTab === 'payrolls' ? 'active' : ''}`}
          onClick={() => setActiveTab('payrolls')}
        >
          Payrolls
        </button>
        <button
          className={`btn btn-outline-primary ${activeTab === 'benefits' ? 'active' : ''}`}
          onClick={() => setActiveTab('benefits')}
        >
          Benefits
        </button>
        <button
          className={`btn btn-outline-primary ${activeTab === 'timesheets' ? 'active' : ''}`}
          onClick={() => setActiveTab('timesheets')}
        >
          Timesheets
        </button>
      </div>

      <div>{renderTab()}</div>
    </div>
  );
};

export default PayrollProcessorDashboard;
