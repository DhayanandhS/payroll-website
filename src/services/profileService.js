import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/employees';

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

const getProfile = (employeeId) =>
  axios.get(`${BASE_URL}/${employeeId}`, getAuthHeaders());

const updateProfile = (employeeId, data) =>
  axios.put(`${BASE_URL}/${employeeId}`, data, getAuthHeaders());

const getAllEmployees = () =>
  axios.get(`${BASE_URL}`, getAuthHeaders());

export default {
  getProfile,
  updateProfile,
  getAllEmployees, // ✅ added this
};
