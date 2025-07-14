import React, { useEffect, useState } from 'react';
import userService from '../services/userService';
import { toast } from 'react-toastify';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null); // 🆕 Track edit mode
  const [showPassword, setShowPassword] = useState(false);
  const [newUser, setNewUser] = useState({
    userName: '',
    email: '',
    password: '',
    role: 'EMPLOYEE',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await userService.getAllUsers();
      setUsers(response.data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await userService.deleteUser(id);
      toast.success('User deleted successfully');
      fetchUsers();
    } catch (err) {
      console.error('Delete failed:', err);

      if (
        err.response &&
        err.response.data &&
        err.response.data.message &&
        err.response.data.message.includes('foreign key constraint fails')
      ) {
        toast.error(
          'Cannot delete user: linked employee has associated benefits. Remove benefits first.'
        );
      } else {
        toast.error('Failed to delete user. Try again.');
      }
    }
  };

  const handleEdit = (user) => {                       
    setNewUser({
      userName: user.userName,
      email: user.email,
      password: '', // Keep empty, don’t show hashed password
      role: user.role,
    });
    setEditingId(user.userId);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await userService.updateUser(editingId, newUser);
        toast.success('User updated successfully!');
      } else {
        await userService.createUser(newUser);
        toast.success('User created successfully!');
      }
      setNewUser({ userName: '', email: '', password: '', role: 'EMPLOYEE' });
      setEditingId(null);
      fetchUsers();
    } catch (err) {
      console.error('User save failed:', err);
      toast.error(editingId ? 'Update failed.' : 'Creation failed.');
    }
  };

  return (
    <div className="container mt-4">
      <h3>Manage Users</h3>

      {/* Table */}
      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.userId}>
              <td>{u.userId}</td>
              <td>{u.userName}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                {u.role !== 'SUPER_ADMIN' ? (
                  <>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(u)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(u.userId)}
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <span className="text-muted">Protected</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form */}
      <div className="card mt-5 p-4 shadow">
        <h4>{editingId ? 'Edit User' : 'Create New User'}</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Username</label>
            <input
              name="userName"
              type="text"
              className="form-control"
              value={newUser.userName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input
              name="email"
              type="email"
              className="form-control"
              value={newUser.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>
              Password{' '}
              {editingId && (
                <span className="text-muted">
                  (Leave empty to keep unchanged)
                </span>
              )}
            </label>
            <div className="input-group">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                value={newUser.password}
                onChange={handleInputChange}
                required={!editingId}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className="mb-3">
            <label>Role</label>
            <select
              name="role"
              className="form-select"
              value={newUser.role}
              onChange={handleInputChange}
            >
              <option value="ADMIN_HR">ADMIN_HR</option>
              <option value="EMPLOYEE">EMPLOYEE</option>
              <option value="PAYROLL_PROCESSOR">PAYROLL_PROCESSOR</option>
              <option value="MANAGER_SUPERVISOR">MANAGER_SUPERVISOR</option>
            </select>
          </div>

          <button type="submit" className="btn btn-success">
            {editingId ? 'Update User' : 'Create User'}
          </button>

          {editingId && (
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => {
                setEditingId(null);
                setNewUser({
                  userName: '',
                  email: '',
                  password: '',
                  role: 'EMPLOYEE',
                });
              }}
            >
              Cancel Edit
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ManageUsers;
