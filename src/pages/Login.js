import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import '../styles/Auth.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  // ✅ Declare formData state
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/login',
        formData
      );
      const token = response.data.token;

      // Store token
      localStorage.setItem('token', token);

      // Decode token to get role
      const decoded = jwtDecode(token);
      const role = decoded.role;

      // Redirect based on role
      if (role === 'SUPER_ADMIN') navigate('/');
      else if (role === 'ADMIN_HR') navigate('/');
      else if (role === 'EMPLOYEE') navigate('/');
      else if (role === 'PAYROLL_PROCESSOR') navigate('/');
      else if (role === 'MANAGER_SUPERVISOR') navigate('/');
      else navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="auth-container">
      {/* Left Side Image */}
      <div className="auth-image login-image"></div>

      {/* Right Side Form */}
      <div className="auth-form">
        <h2>&nbsp;&nbsp;Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className="form-control styled-input"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control styled-input"
              required
            />
          </div>

          <button type="submit" className="btn styled-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
