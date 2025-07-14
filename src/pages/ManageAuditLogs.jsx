// src/pages/ManageAuditLogs.jsx
import React, { useEffect, useState } from "react";
import auditService from "../services/auditService";
import { toast } from "react-toastify";

function ManageAuditLogs() {
  const [logs, setLogs] = useState([]);
  const [newLog, setNewLog] = useState({
    userId: "",
    action: "",
    timestamp: "",
    details: "",
  });

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await auditService.getAllLogs();
      setLogs(res.data);
    } catch {
      toast.error("Failed to fetch audit logs.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewLog((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await auditService.createLog(newLog);
      toast.success("Log created successfully!");
      setNewLog({ userId: "", action: "", timestamp: "", details: "" });
      fetchLogs();
    } catch {
      toast.error("Log creation failed.");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Audit Logs</h3>

      {/* 🧾 Audit Log Table */}
      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>Log ID</th>
            <th>User ID</th>
            <th>User Name</th>
            <th>Action</th>
            <th>Timestamp</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.logId}>
              <td>{log.logId}</td>
              <td>{log.userId}</td>
              <td>{log.userName}</td>
              <td>{log.action}</td>
              <td>{log.timestamp}</td>
              <td>{log.details}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🧪 Optional Form (for admin testing) */}
      <div className="card mt-5 p-4 shadow">
        <h4>Create Audit Log (Admin Only)</h4>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label>User ID</label>
              <input name="userId" type="number" className="form-control" value={newLog.userId} onChange={handleChange} required />
            </div>
            <div className="col-md-4 mb-3">
              <label>Action</label>
              <input name="action" className="form-control" value={newLog.action} onChange={handleChange} required />
            </div>
            <div className="col-md-4 mb-3">
              <label>Timestamp</label>
              <input name="timestamp" type="datetime-local" className="form-control" value={newLog.timestamp} onChange={handleChange} required />
            </div>
            <div className="col-12 mb-3">
              <label>Details</label>
              <textarea name="details" className="form-control" rows="3" value={newLog.details} onChange={handleChange} required />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">Create Log</button>
        </form>
      </div>
    </div>
  );
}

export default ManageAuditLogs;
