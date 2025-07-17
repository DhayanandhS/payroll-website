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
    <div className="manage-employees-container ">
      <h2 className="mb-4 text-black">Payroll Processor Dashboard</h2>

      <div
        className="btn-group mb-4 bg-dark rounded overflow-hidden shadow-sm"
        role="group"
      >
        <button
          className={`btn ${
            activeTab === 'payrolls'
              ? 'btn-primary'
              : 'btn-dark text-white-50 border-0'
          }`}
          onClick={() => setActiveTab('payrolls')}
        >
          Payrolls
        </button>
        <button
          className={`btn ${
            activeTab === 'benefits'
              ? 'btn-primary'
              : 'btn-dark text-white-50 border-0'
          }`}
          onClick={() => setActiveTab('benefits')}
        >
          Benefits
        </button>
        <button
          className={`btn ${
            activeTab === 'timesheets'
              ? 'btn-primary'
              : 'btn-dark text-white-50 border-0'
          }`}
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
