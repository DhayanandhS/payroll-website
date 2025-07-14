// src/services/auditService.js
import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/audit-logs';

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

const getAllLogs = () => axios.get(API_BASE, getAuthHeaders());
const createLog = (data) => axios.post(API_BASE, data, getAuthHeaders());

const auditService = {
  getAllLogs,
  createLog,
};

export default auditService;
