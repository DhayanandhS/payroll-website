import React, { useEffect, useState } from 'react';
import employeeService from '../services/employeeService';
import { toast } from 'react-toastify';
import '../styles/ManageEmployees.css';

function ManageEmployees() {
  const [employees, setEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newEmp, setNewEmp] = useState({
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    hireDate: '',
    dob: '',
    designation: '',
    status: 'ACTIVE',
    managerId: '',
  });

  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = employees.filter((emp) =>
    `${emp.firstName} ${emp.lastName} ${emp.email} ${emp.department} ${emp.managerId}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await employeeService.getAllEmployees();
      setEmployees(res.data);
    } catch (err) {
      console.error('Failed to fetch employees:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmp((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (employee) => {
    setNewEmp({
      userId: employee.userId,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phone: employee.phone,
      department: employee.department,
      hireDate: employee.hireDate,
      dob: employee.dob,
      designation: employee.designation,
      status: employee.status,
      managerId: employee.managerId || '',
    });
    setEditingId(employee.employeeId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await employeeService.updateEmployee(editingId, newEmp);
        toast.success('User created successfully!');
      } else {
        await employeeService.createEmployee(newEmp);
        toast.error('Error creating user.');
      }

      setNewEmp({
        userId: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        department: '',
        hireDate: '',
        dob: '',
        designation: '',
        status: 'ACTIVE',
        managerId: '',
      });
      setEditingId(null);
      fetchEmployees();
    } catch (err) {
      console.error('Failed to save employee:', err);
      alert(
        editingId ? 'Failed to update employee.' : 'Failed to create employee.'
      );
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?'))
      return;
    try {
      await employeeService.deleteEmployee(id);
      fetchEmployees();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div className="manage-employees-container">
      {/* Create / Edit Form */}
      <div className="card mt-5 p-4 shadow manage-employee-form-bg">
        <h4 className="employee-db-form-title">
          {editingId ? 'Edit Employee' : 'Create New Employee'}
        </h4>
        <div className="employee-form-card">
          <form className="employee-form" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>User ID</label>
                <input
                  type="number"
                  name="userId"
                  className="form-control"
                  value={newEmp.userId}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>First Name</label>
                <input
                  name="firstName"
                  className="form-control"
                  value={newEmp.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>Last Name</label>
                <input
                  name="lastName"
                  className="form-control"
                  value={newEmp.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={newEmp.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>Phone</label>
                <input
                  name="phone"
                  className="form-control"
                  value={newEmp.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>Department</label>
                <input
                  name="department"
                  className="form-control"
                  value={newEmp.department}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>Hire Date</label>
                <input
                  type="date"
                  name="hireDate"
                  className="form-control"
                  value={newEmp.hireDate}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  className="form-control"
                  value={newEmp.dob}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>Designation</label>
                <input
                  name="designation"
                  className="form-control"
                  value={newEmp.designation}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>Status</label>
                <select
                  name="status"
                  className="form-select"
                  value={newEmp.status}
                  onChange={handleChange}
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label>Manager ID (Optional)</label>
                <input
                  name="managerId"
                  className="form-control"
                  value={newEmp.managerId}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-success">
              {editingId ? 'Update Employee' : 'Create Employee'}
            </button>

            {editingId && (
              <button
                type="button"
                className="action-btn edit-btn"
                onClick={() => {
                  setEditingId(null);
                  setNewEmp({
                    userId: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    department: '',
                    hireDate: '',
                    dob: '',
                    designation: '',
                    status: 'ACTIVE',
                    managerId: '',
                  });
                }}
              >
                Cancel Edit
              </button>
            )}
          </form>
        </div>
      </div>
      <h3 className="text-black">Filter Employees</h3>
      <div className="employee-user-filter">
        <input
          type="text"
          placeholder="Search by name, email, department or manager ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Employees Table */}
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Designation</th>
            <th>DOB</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Hire Date</th>
            <th>Manager ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((emp) => (
            <tr key={emp.employeeId}>
              <td>{emp.employeeId}</td>
              <td>
                {emp.firstName} {emp.lastName}
              </td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td>{emp.designation}</td>
              <td>{emp.dob}</td>
              <td>{emp.phone}</td>
              <td>{emp.status}</td>
              <td>{emp.hireDate}</td>
              <td>{emp.managerId}</td>
              <td>
                <button
                  className="action-btn edit-btn"
                  onClick={() => handleEdit(emp)}
                >
                  Edit
                </button>
                <button
                  className="action-btn delete-btn"
                  onClick={() => handleDelete(emp.employeeId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageEmployees;
