// src/pages/ManagePolicies.jsx
import React, { useEffect, useState } from 'react';
import policyService from '../services/policyService';
import { toast } from 'react-toastify';
import '../styles/ManageEmployees.css';

function ManagePolicies() {
  const [policies, setPolicies] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    policyName: '',
    taxRate: '',
    bonusPercentage: '',
    benefitPercentage: '',
    effectiveFrom: '',
    effectiveTo: '',
  });

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    try {
      const res = await policyService.getAllPolicies();
      setPolicies(res.data);
    } catch (err) {
      toast.error('Failed to load policies');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (p) => {
    setForm(p);
    setEditingId(p.policyId);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this policy?')) return;
    try {
      await policyService.deletePolicy(id);
      toast.success('Deleted');
      fetchPolicies();
    } catch {
      toast.error('Delete failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await policyService.updatePolicy(editingId, form);
        toast.success('Policy updated!');
      } else {
        await policyService.createPolicy(form);
        toast.success('Policy created!');
      }
      setForm({
        policyName: '',
        taxRate: '',
        bonusPercentage: '',
        benefitPercentage: '',
        effectiveFrom: '',
        effectiveTo: '',
      });
      setEditingId(null);
      fetchPolicies();
    } catch {
      toast.error('Save failed');
    }
  };

  return (
    <div className="manage-employees-container">

      

      {/* Form */}
      <div className="card mt-5 p-4 shadow manage-employee-form-bg">
        <h4 className="employee-db-form-title">
          {editingId ? 'Edit Policy' : 'Create New Policy'}
        </h4>
        <div className="employee-form-card">
          <form onSubmit={handleSubmit} className="employee-form row">
            <div className="col-md-6 mb-3">
              <label>Policy Name</label>
              <input
                name="policyName"
                className="form-control"
                value={form.policyName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3 mb-3">
              <label>Tax Rate</label>
              <input
                name="taxRate"
                type="number"
                step="0.01"
                className="form-control"
                value={form.taxRate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3 mb-3">
              <label>Bonus %</label>
              <input
                name="bonusPercentage"
                type="number"
                step="0.01"
                className="form-control"
                value={form.bonusPercentage}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3 mb-3">
              <label>Benefit %</label>
              <input
                name="benefitPercentage"
                type="number"
                step="0.01"
                className="form-control"
                value={form.benefitPercentage}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3 mb-3">
              <label>Effective From</label>
              <input
                name="effectiveFrom"
                type="date"
                className="form-control"
                value={form.effectiveFrom}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3 mb-3">
              <label>Effective To</label>
              <input
                name="effectiveTo"
                type="date"
                className="form-control"
                value={form.effectiveTo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-12">
              <button type="submit" className="btn btn-success me-2">
                {editingId ? 'Update Policy' : 'Create Policy'}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setEditingId(null);
                    setForm({
                      policyName: '',
                      taxRate: '',
                      bonusPercentage: '',
                      benefitPercentage: '',
                      effectiveFrom: '',
                      effectiveTo: '',
                    });
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Table */}
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Tax %</th>
            <th>Bonus %</th>
            <th>Benefit %</th>
            <th>Effective From</th>
            <th>Effective To</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {policies.map((p) => (
            <tr key={p.policyId}>
              <td>{p.policyId}</td>
              <td>{p.policyName}</td>
              <td>{p.taxRate}</td>
              <td>{p.bonusPercentage}</td>
              <td>{p.benefitPercentage}</td>
              <td>{p.effectiveFrom}</td>
              <td>{p.effectiveTo}</td>
              <td>
                <button
                  className="action-btn edit-btn"
                  onClick={() => handleEdit(p)}
                >
                  Edit
                </button>
                <button
                  className="action-btn delete-btn"
                  onClick={() => handleDelete(p.policyId)}
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

export default ManagePolicies;
