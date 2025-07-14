// src/components/timesheets/SubmitTimesheet.jsx
import React, { useState, useEffect } from 'react';
import timesheetService from '../../services/timeSheetService';
import { toast } from 'react-toastify';

const SubmitTimesheet = () => {
  const [formData, setFormData] = useState({
    employeeId: '',
    date: '',
    hoursWorked: '',
    status: 'PENDING',
  });

  const [timesheets, setTimesheets] = useState([]);

  // Load employeeId from localStorage on mount
  useEffect(() => {
    const empId = localStorage.getItem('employeeId');
    if (empId) {
      setFormData((prev) => ({ ...prev, employeeId: empId }));
      fetchTimesheets(empId);
    }
  }, []);

  const fetchTimesheets = async (empId) => {
    try {
      const res = await timesheetService.getTimesheetsByEmployee(empId);
      const data = Array.isArray(res.data) ? res.data : [res.data];
      setTimesheets(data);
    } catch (err) {
      console.error('Error fetching timesheets:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await timesheetService.submitTimesheet(formData);
      toast.success('Timesheet submitted!');
      setFormData((prev) => ({ ...prev, date: '', hoursWorked: '' }));
      fetchTimesheets(formData.employeeId); // refresh table
    } catch (err) {
      toast.error('Submission failed');
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="card p-4 mb-4 shadow-sm">
        <h5 className="mb-3">Submit Timesheet</h5>
        <div className="row">
          <div className="col-md-4 mb-3">
            <label>Date</label>
            <input
              type="date"
              name="date"
              className="form-control"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>Hours Worked</label>
            <input
              type="number"
              name="hoursWorked"
              step="0.1"
              className="form-control"
              value={formData.hoursWorked}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      {/* 👇 Submitted timesheets shown immediately below */}
      <div className="card p-4 shadow-sm">
        <h5 className="mb-3">My Submitted Timesheets</h5>
        {timesheets.length === 0 ? (
          <p>No timesheets submitted yet.</p>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default SubmitTimesheet;
