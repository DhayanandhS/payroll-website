/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import '../styles/Register.css';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'EMPLOYEE',
  });

  const [message, setMessage] = useState('');

  const roles = [
    'EMPLOYEE',
    'PAYROLL_PROCESSOR',
    'MANAGER_SUPERVISOR',
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.info('Password does not!');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          email: formData.email,
          role: formData.role,
        }),
      });

      if (response.ok) {
        toast.success('✅ Registration successful!');
      } else {
        const err = await response.json();
        toast.error('❌ Error: ' + (err.message || 'Something went wrong'));
      }
    } catch (error) {
      toast.error('❌ Network Error');
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-left">
        <h2>&nbsp;&nbsp; Register</h2>
        {message && <div className="alert alert-info">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>&nbsp;&nbsp;Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              required
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>&nbsp;&nbsp;Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              required
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>&nbsp;&nbsp;Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              required
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>&nbsp;&nbsp;Confirm Password</label>
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              required
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>&nbsp;&nbsp;Role</label>
            <select
              className="form-select"
              name="role"
              onChange={handleChange}
              defaultValue="EMPLOYEE"
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </form>
      </div>

      <div className="register-right"></div>

    </div>
  );
}

export default Register;
