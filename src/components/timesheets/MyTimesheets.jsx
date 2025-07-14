// src/components/timesheets/MyTimesheets.jsx
import React, { useEffect, useState } from 'react';
import timesheetService from '../../services/timeSheetService';

const MyTimesheets = ({ refreshKey }) => {
  const [timesheets, setTimesheets] = useState([]);

  useEffect(() => {
    const empId = localStorage.getItem('employeeId');
    if (empId) {
      fetchTimesheets(empId);
    }
  }, [refreshKey]); // ✅ re-fetch when refreshed

  const fetchTimesheets = async (id) => {
    try {
      const res = await timesheetService.getTimesheetsByEmployee(id);
      setTimesheets(Array.isArray(res.data) ? res.data : [res.data]);
    } catch (err) {
      console.error('Failed to fetch timesheets:', err);
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Date</th>
            <th>Hours Worked</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {timesheets.map((t) => (
            <tr key={t.timeSheetId}>
              <td>{t.date}</td>
              <td>{t.hoursWorked}</td>
              <td>{t.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyTimesheets;
