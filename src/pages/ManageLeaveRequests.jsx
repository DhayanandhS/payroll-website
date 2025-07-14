import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ManageLeaveRequests = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/leaves', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setLeaves(res.data);
    } catch (err) {
      toast.error('Failed to fetch leave requests');
    }
  };

  const updateStatus = async (leave, status) => {
    try {
      await axios.put(`http://localhost:8080/api/leaves/${leave.leaveId}`, {
        employeeId: leave.employeeId,
        fromDate: leave.fromDate,
        toDate: leave.toDate,
        reason: leave.reason,
        status: status,
        submittedOn: leave.submittedOn,
        approvedBy: leave.approvedById,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      toast.success(`Leave ${status.toLowerCase()}`);
      fetchLeaves();
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="container mt-4">
      <h3>📝 Leave Requests</h3>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Employee</th>
            <th>From</th>
            <th>To</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Submitted</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave.leaveId}>
              <td>{leave.employeeName}</td>
              <td>{leave.fromDate}</td>
              <td>{leave.toDate}</td>
              <td>{leave.reason}</td>
              <td>{leave.status}</td>
              <td>{leave.submittedOn}</td>
              <td>
                {leave.status === 'PENDING' && (
                  <>
                    <button className="btn btn-success btn-sm me-2"
                      onClick={() => updateStatus(leave, 'APPROVED')}>Approve</button>
                    <button className="btn btn-danger btn-sm"
                      onClick={() => updateStatus(leave, 'REJECTED')}>Reject</button>
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

export default ManageLeaveRequests;
