// File: src/components/payroll/PayrollsTab.jsx
import React, { useEffect, useState } from 'react';
import payrollService from '../../services/payrollService';
import { toast } from 'react-toastify';

function PayrollsTab() {
  const [payrolls, setPayrolls] = useState([]);
  const [formData, setFormData] = useState({
    employeeId: '',
    month: '',
    year: '',
    baseSalary: '',
    benefits: '',
    tax: '',
    netPay: '',
    generatedOn: '',
    policyId: '',
    timeSheetId: '',
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchPayrolls();
  }, []);

  const fetchPayrolls = async () => {
    try {
      const res = await payrollService.getAllPayrolls();
      setPayrolls(res.data);
    } catch {
      toast.error('Failed to fetch payrolls');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await payrollService.updatePayroll(editingId, formData);
        toast.success('Payroll updated');
      } else {
        await payrollService.addPayroll(formData);
        toast.success('Payroll added');
      }
      setFormData({
        employeeId: '',
        month: '',
        year: '',
        baseSalary: '',
        benefits: '',
        tax: '',
        netPay: '',
        generatedOn: '',
        policyId: '',
        timeSheetId: '',
      });
      setEditingId(null);
      fetchPayrolls();
    } catch {
      toast.error('Failed to submit payroll');
    }
  };

  const handleEdit = (payroll) => {
    setFormData(payroll);
    setEditingId(payroll.payrollId);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this payroll?')) {
      await payrollService.deletePayroll(id);
      fetchPayrolls();
      toast.success('Deleted successfully');
    }
  };

  return (
    <div>
      <form className="row g-3 mb-4" onSubmit={handleSubmit}>
        {Object.entries(formData).map(([key, value]) => (
          <div className="col-md-3" key={key}>
            <input
              className="form-control"
              name={key}
              value={value}
              placeholder={key}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <div className="col-md-12">
          <button className="btn btn-primary" type="submit">
            {editingId ? 'Update Payroll' : 'Add Payroll'}
          </button>
        </div>
      </form>

      <table className="employee-table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Month</th>
            <th>Year</th>
            <th>Salary</th>
            <th>Benefits</th>
            <th>Tax</th>
            <th>Net Pay</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payrolls.map((p) => (
            <tr key={p.payrollId}>
              <td>{p.employeeId}</td>
              <td>{p.month}</td>
              <td>{p.year}</td>
              <td>{p.baseSalary}</td>
              <td>{p.benefits}</td>
              <td>{p.tax}</td>
              <td>{p.netPay}</td>
              <td>{p.generatedOn}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(p)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(p.payrollId)}
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

export default PayrollsTab;
