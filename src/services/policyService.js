// src/services/policyService.js
import axios from "axios";

const API_BASE = "http://localhost:8080/api/policies";

// ✅ Attach JWT
const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const getAllPolicies = () => axios.get(API_BASE, getAuthHeaders());
const createPolicy = (data) => axios.post(API_BASE, data, getAuthHeaders());
const updatePolicy = (id, data) => axios.put(`${API_BASE}/${id}`, data, getAuthHeaders());
const deletePolicy = (id) => axios.delete(`${API_BASE}/${id}`, getAuthHeaders());

const policyService = {
  getAllPolicies,
  createPolicy,
  updatePolicy,
  deletePolicy,
};

export default policyService;
