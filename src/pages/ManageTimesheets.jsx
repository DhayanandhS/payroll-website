import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ManageTimesheets = () => {
  const [timesheets, setTimesheets] = useState([]);
  const [filteredTimesheets, setFilteredTimesheets] = useState([]);

  // Filters
  const [filterId, setFilterId] = useState('');
  const [filterEmpId, setFilterEmpId] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    fetchTimesheets();
  }, []);

  const fetchTimesheets = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/timesheets', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTimesheets(res.data);
      setFilteredTimesheets(res.data);
    } catch (err) {
      toast.error('Failed to fetch timesheets');
    }
  };

  const updateStatus = async (ts, status) => {
    try {
      await axios.put(
        `http://localhost:8080/api/timesheets/${ts.timeSheetId}`,
        {
          employeeId: ts.employeeId,
          date: ts.date,
          hoursWorked: ts.hoursWorked,
          status: status,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      toast.success(`Timesheet ${status.toLowerCase()}`);
      fetchTimesheets();
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const handleFilter = () => {
    const filtered = timesheets.filter((ts) => {
      const matchId = filterId ? ts.timeSheetId.toString().includes(filterId) : true;
      const matchEmp = filterEmpId ? ts.employeeId.toString().includes(filterEmpId) : true;
      const matchStatus = filterStatus ? ts.status.toLowerCase().includes(filterStatus.toLowerCase()) : true;
      return matchId && matchEmp && matchStatus;
    });
    setFilteredTimesheets(filtered);
  };

  useEffect(() => {
    handleFilter();
  }, [filterId, filterEmpId, filterStatus]);

  return (
    <div className="manage-employees-container">
      <h3 className="text-black mb-4">⏱️ Timesheet Management</h3>

      {/* Filter Row */}
      <div className="row mb-3">
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Filter by Timesheet ID"
            value={filterId}
            onChange={(e) => setFilterId(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Filter by Employee ID"
            value={filterEmpId}
            onChange={(e) => setFilterEmpId(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Filter by Status (e.g. PENDING)"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <table className="employee-table table table-bordered table-striped">
        <thead>
          <tr className="table-dark">
            <th>Timesheet ID</th>
            <th>Employee ID</th>
            <th>Date</th>
            <th>Hours</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTimesheets.length > 0 ? (
            filteredTimesheets.map((ts) => (
              <tr key={ts.timeSheetId}>
                <td>{ts.timeSheetId}</td>
                <td>{ts.employeeId}</td>
                <td>{ts.date}</td>
                <td>{ts.hoursWorked}</td>
                <td>{ts.status}</td>
                <td>
                  {ts.status === 'PENDING' && (
                    <>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => updateStatus(ts, 'APPROVED')}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => updateStatus(ts, 'REJECTED')}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-muted">No records found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageTimesheets;
