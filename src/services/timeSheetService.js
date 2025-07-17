// src/services/timeSheetService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/timesheets';

// Attach Authorization header with token from localStorage
const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

/**
 * Fetch timesheets submitted by a specific employee using their ID.
 * @param {number|string} id - Employee ID
 * @returns {Promise} Axios response Promise
 */
const getTimesheetsByEmployee = (id) =>
  axios.get(`${BASE_URL}/${id}`, getAuthHeaders());

/**
 * Submit a new timesheet entry.
 * @param {Object} data - Timesheet data (e.g., date, hours worked)
 * @returns {Promise} Axios response Promise
 */
const submitTimesheet = (data) =>
  axios.post(BASE_URL, data, getAuthHeaders());

// Export all functions for use in components
export default {
  getTimesheetsByEmployee,
  submitTimesheet,
};
