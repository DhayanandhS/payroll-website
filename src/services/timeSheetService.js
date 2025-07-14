// src/services/timeSheetService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/timesheets';

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

const getTimesheetsByEmployee = (id) =>
  axios.get(`${BASE_URL}/${id}`, getAuthHeaders());

const submitTimesheet = (data) =>
  axios.post(BASE_URL, data, getAuthHeaders());

export default {
  getTimesheetsByEmployee,
  submitTimesheet, // ✅ correctly spelled
};
