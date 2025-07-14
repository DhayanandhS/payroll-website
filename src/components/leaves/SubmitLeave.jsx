// src/components/leave/SubmitLeave.jsx
import React, { useEffect, useState } from 'react';
import leaveService from '../../services/leaveService';
import profileService from '../../services/profileService';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

function SubmitLeave() {
  const [leaveList, setLeaveList] = useState([]);
  const [employeeId, setEmployeeId] = useState(null);
  const [formData, setFormData] = useState({
    fromDate: '',
    toDate: '',
    reason: '',
  });

  // ✅ Step 1: Try to load employeeId from localStorage (MyProfile may have set it)
  useEffect(() => {
    const storedId = localStorage.getItem('employeeId');
    if (storedId) {
      setEmployeeId(parseInt(storedId));
    }
  }, []);

  // ✅ Step 2: If employeeId not found, decode token and match using employee firstName
  useEffect(() => {
    if (!employeeId) {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const decoded = jwtDecode(token);
        const username = decoded.sub;
        console.log('✅ Decoded username from token:', username);

        profileService.getAllEmployees().then((res) => {
          console.log('📋 Full employee data:', res.data);

          res.data.forEach((emp, i) => {
            console.log(`Employee ${i + 1}:`, emp);
          });

          const matched = res.data.find(
            (emp) => emp.firstName?.toLowerCase() === username?.toLowerCase()
          );

          if (matched) {
            console.log('✅ Matched employee:', matched);
            setEmployeeId(matched.employeeId);
            localStorage.setItem('employeeId', matched.employeeId);
          } else {
            console.warn(
              '❌ No matching employee found for username:',
              username
            );
            toast.error('No matching employee found');
          }
        });
      } catch (err) {
        console.error('JWT decode error:', err);
        toast.error('Invalid token');
      }
    }
  }, [employeeId]);

  // ✅ Step 3: Fetch leave data after employeeId is resolved
  useEffect(() => {
    if (employeeId) fetchLeaves();
  }, [employeeId]);

  const fetchLeaves = async () => {
    try {
      const res = await leaveService.getLeavesByEmployee(employeeId);
      console.log('📦 Raw leave response:', res.data);

      const leaves = Array.isArray(res.data) ? res.data : [res.data];
      console.log('✅ Normalized leave array:', leaves);

      setLeaveList(leaves);
    } catch (err) {
      console.error('Error fetching leaves:', err);
      toast.error('Failed to fetch leave records.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        employeeId,
        status: 'PENDING',
        submittedOn: new Date().toISOString().split('T')[0],
        approvedBy: employeeId,
      };
      await leaveService.submitLeave(payload);
      toast.success('Leave request submitted!');
      setFormData({ fromDate: '', toDate: '', reason: '' });
      fetchLeaves();
    } catch (err) {
      console.error('Error submitting leave:', err);
      toast.error('Leave request failed.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mt-4">
      <h3>Leave Request</h3>
      <form onSubmit={handleSubmit} className="card p-4 shadow mb-5">
        <div className="row">
          <div className="col-md-4 mb-3">
            <label>From Date</label>
            <input
              type="date"
              name="fromDate"
              className="form-control"
              value={formData.fromDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>To Date</label>
            <input
              type="date"
              name="toDate"
              className="form-control"
              value={formData.toDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>Reason</label>
            <input
              type="text"
              name="reason"
              className="form-control"
              value={formData.reason}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit Leave
        </button>
      </form>

      <h4>My Leave History</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Leave ID</th>
            <th>From</th>
            <th>To</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Approved By</th>
          </tr>
        </thead>
        <tbody>
          {leaveList.map((leave) => (
            <tr key={leave.leaveId}>
              <td>{leave.leaveId}</td>
              <td>{leave.fromDate}</td>
              <td>{leave.toDate}</td>
              <td>{leave.reason}</td>
              <td>{leave.status}</td>
              <td>{leave.approvedByName || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SubmitLeave;
