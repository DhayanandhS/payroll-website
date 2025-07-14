import axios from "axios";

const API_BASE = "http://localhost:8080/api/employees";

// Attach JWT token
const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const getAllEmployees = () => axios.get(API_BASE, getAuthHeaders());
const createEmployee = (data) => axios.post(API_BASE, data, getAuthHeaders());
const updateEmployee = (id, data) => axios.put(`${API_BASE}/${id}`, data, getAuthHeaders());
const deleteEmployee = (id) => axios.delete(`${API_BASE}/${id}`, getAuthHeaders());

const employeeService = {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};

export default employeeService;
