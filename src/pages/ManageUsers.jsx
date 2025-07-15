import React, { useEffect, useState } from 'react';
import userService from '../services/userService';
import { toast } from 'react-toastify';
import '../styles/ManageUsers.css';

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
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter((u) =>
    `${u.userName} ${u.email} ${u.role}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

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
    <div className="user-management-wrapper">
      <h2 className="section-title">👥 Manage Users</h2>
      <div className="user-filter">
        <input
          type="text"
          placeholder="Search by username or email or role"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <br />
      {/* Form */}
      <div className="user-form-card two-column">
        {/* Left: Form */}
        <div className="form-column">
          <h3>{editingId ? '✏️ Edit User' : '➕ Create New User'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                name="userName"
                type="text"
                value={newUser.userName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                name="email"
                type="email"
                value={newUser.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>
                Password{' '}
                {editingId && (
                  <span className="note">(Leave empty to keep unchanged)</span>
                )}
              </label>
              <div className="password-wrapper">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={newUser.password}
                  onChange={handleInputChange}
                  required={!editingId}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Role</label>
              <select
                name="role"
                value={newUser.role}
                onChange={handleInputChange}
              >
                <option value="ADMIN_HR">ADMIN_HR</option>
                <option value="EMPLOYEE">EMPLOYEE</option>
                <option value="PAYROLL_PROCESSOR">PAYROLL_PROCESSOR</option>
                <option value="MANAGER_SUPERVISOR">MANAGER_SUPERVISOR</option>
              </select>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">
                {editingId ? 'Update' : 'Create'}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="cancel-btn"
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
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Right: Image */}
        <div className="image-column image-background" />
      </div>

      <br />
      <br />
      {/* Table */}
      <div className="table-wrapper">
        <table className="minimal-table">
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
            {filteredUsers.map((u) => (
              <tr key={u.userId}>
                <td>{u.userId}</td>
                <td>{u.userName}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  {u.role !== 'SUPER_ADMIN' ? (
                    <>
                      <button
                        className="action-btn edit"
                        onClick={() => handleEdit(u)}
                      >
                        ✏️
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => handleDelete(u.userId)}
                      >
                        🗑️
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
      </div>
    </div>
  );
}

export default ManageUsers;
