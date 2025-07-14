// src/pages/Timesheet.jsx
import React from 'react';
import SubmitTimesheet from '../components/timesheets/SubmitTimesheet';

const Timesheet = () => {
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Timesheet Portal</h2>
      <SubmitTimesheet />
    </div>
  );
};

export default Timesheet;
