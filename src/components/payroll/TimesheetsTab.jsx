import React, { useEffect, useState } from 'react';
import payrollService from '../../services/payrollService';
import { toast } from 'react-toastify';

const TimesheetsTab = () => {
  const [timesheets, setTimesheets] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    employeeId: '',
    date: '',
    hoursWorked: '',
    status: '',
  });

  useEffect(() => {
    fetchTimesheets();
  }, []);

  const fetchTimesheets = async () => {
    try {
      const res = await payrollService.getAllTimesheets();
      setTimesheets(res.data || []);
    } catch (err) {
      toast.error('Failed to fetch timesheets.');
      console.error(err);
    }
  };

  const handleEdit = (ts) => {
    setEditingId(ts.timeSheetId);
    setFormData({
      employeeId: ts.employeeId,
      date: ts.date,
      hoursWorked: ts.hoursWorked,
      status: ts.status,
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await payrollService.updateTimesheet(editingId, formData);
      toast.success('Timesheet updated successfully!');
      setEditingId(null);
      fetchTimesheets();
    } catch (err) {
      toast.error('Update failed.');
      console.error(err);
    }
  };

  return (
    <div>
      <h5 className="mb-3 text-black">Process Timesheets</h5>

      {editingId && (
        <form onSubmit={handleUpdate} className="row g-2 mb-4">
          <div className="col-md-2">
            <input
              type="number"
              name="employeeId"
              className="form-control"
              value={formData.employeeId}
              disabled
              readOnly
            />
          </div>
          <div className="col-md-2">
            <input
              type="date"
              name="date"
              className="form-control"
              value={formData.date}
              disabled
              readOnly
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              step="0.1"
              name="hoursWorked"
              className="form-control"
              value={formData.hoursWorked}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-2">
            <select
              name="status"
              className="form-select"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
          <div className="col-md-4">
            <button type="submit" className="btn btn-success me-2">
              Update
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setEditingId(null)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="table-responsive">
        <table className="employee-table">
          <thead>
            <tr>
              <th>Timesheet ID</th>
              <th>Employee ID</th>
              <th>Date</th>
              <th>Hours</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {timesheets.map((ts) => (
              <tr key={ts.timeSheetId}>
                <td>{ts.timeSheetId}</td>
                <td>{ts.employeeId}</td>
                <td>{ts.date}</td>
                <td>{ts.hoursWorked}</td>
                <td>{ts.status}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEdit(ts)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
            {timesheets.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center">
                  No timesheets available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimesheetsTab;
