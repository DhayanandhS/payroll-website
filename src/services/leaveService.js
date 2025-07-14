// src/services/leaveService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/leaves';

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

const getLeavesByEmployee = (id) =>
  axios.get(`${BASE_URL}/${id}`, getAuthHeaders());

const submitLeave = (data) =>
  axios.post(BASE_URL, data, getAuthHeaders());

export default {
  getLeavesByEmployee,
  submitLeave,
};
