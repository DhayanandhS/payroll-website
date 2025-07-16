import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ManageTimesheets = () => {
  const [timesheets, setTimesheets] = useState([]);

  useEffect(() => {
    fetchTimesheets();
  }, []);

  const fetchTimesheets = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/timesheets', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTimesheets(res.data);
    } catch (err) {
      toast.error('Failed to fetch timesheets');
    }
  };

  const updateStatus = async (ts, status) => {
    try {
      await axios.put(`http://localhost:8080/api/timesheets/${ts.timeSheetId}`, {
        employeeId: ts.employeeId,
        date: ts.date,
        hoursWorked: ts.hoursWorked,
        status: status,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      toast.success(`Timesheet ${status.toLowerCase()}`);
      fetchTimesheets();
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="manage-employees-container">
      <h3 className='text-black'>⏱️ Timesheet Management</h3>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Date</th>
            <th>Hours</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {timesheets.map((ts) => (
            <tr key={ts.timeSheetId}>
              <td>{ts.employeeId}</td>
              <td>{ts.date}</td>
              <td>{ts.hoursWorked}</td>
              <td>{ts.status}</td>
              <td>
                {ts.status === 'PENDING' && (
                  <>
                    <button className="btn btn-success btn-sm me-2"
                      onClick={() => updateStatus(ts, 'APPROVED')}>Approve</button>
                    <button className="btn btn-danger btn-sm"
                      onClick={() => updateStatus(ts, 'REJECTED')}>Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageTimesheets;
