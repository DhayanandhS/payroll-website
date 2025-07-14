import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import profileService from '../../services/profileService';
import { toast } from 'react-toastify';

function MyProfile() {
  console.log('MyProfile component rendered');

  const [employeeId, setEmployeeId] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  // Get username from token and match it with employee user.username
  useEffect(() => {
    console.log('Running fetchEmployeeId useEffect');

    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token);

    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log('Decoded token:', decoded);

        const username = decoded.sub;
        console.log('Extracted username:', username);

        profileService
          .getAllEmployees()
          .then((res) => {
            console.log('All employees:', res.data);

            const matchedEmployee = res.data.find(
              (emp) => emp.firstName?.toLowerCase() === username.toLowerCase()
            );

            if (matchedEmployee) {
              console.log('Matched employee:', matchedEmployee);
              setEmployeeId(matchedEmployee.employeeId);
              setEmployee(matchedEmployee);
              setFormData(matchedEmployee);
              // ✅ Save employeeId globally for other components (like SubmitLeave.jsx)
              localStorage.setItem('employeeId', matchedEmployee.employeeId);
            } else {
              console.warn(
                'No matching employee found for username:',
                username
              );
              toast.error('No matching employee found');
            }
          })
          .catch((err) => {
            console.error('Error fetching all employees:', err);
            toast.error('Failed to fetch employees');
          });
      } catch (err) {
        console.error('JWT decode failed', err);
        toast.error('Invalid token');
      }
    } else {
      console.warn('No token found in localStorage');
    }
  }, []);

  // Re-fetch in case you want a separate profile refresh
  const loadProfile = async () => {
    console.log('Fetching profile for employeeId:', employeeId);
    try {
      const res = await profileService.getProfile(employeeId);
      console.log('Profile response:', res.data);
      setEmployee(res.data);
      setFormData(res.data);
    } catch (err) {
      console.error('Failed to fetch profile:', err);
      toast.error('Failed to load profile');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await profileService.updateProfile(employeeId, formData);
      toast.success('Profile updated');
      setIsEditing(false);
      loadProfile(); // Optional: reload updated profile
    } catch {
      toast.error('Update failed');
    }
  };

  if (!employee) return <p>Loading profile...</p>;

  return (
    <div className="container mt-4">
      <h3>My Profile</h3>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>First Name</label>
            <input
              name="firstName"
              className="form-control"
              value={formData.firstName || ''}
              disabled
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Last Name</label>
            <input
              name="lastName"
              className="form-control"
              value={formData.lastName || ''}
              disabled
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Email</label>
            <input
              name="email"
              className="form-control"
              value={formData.email || ''}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Phone</label>
            <input
              name="phone"
              className="form-control"
              value={formData.phone || ''}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Department</label>
            <input
              name="department"
              className="form-control"
              value={formData.department || ''}
              disabled
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Designation</label>
            <input
              name="designation"
              className="form-control"
              value={formData.designation || ''}
              disabled
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Date of Birth</label>
            <input
              name="dob"
              type="date"
              className="form-control"
              value={formData.dob || ''}
              disabled
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Hire Date</label>
            <input
              name="hireDate"
              type="date"
              className="form-control"
              value={formData.hireDate || ''}
              disabled
            />
          </div>
        </div>

        {isEditing ? (
          <>
            <button type="submit" className="btn btn-success me-2">
              Save
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setIsEditing(false);
                setFormData(employee);
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        )}
      </form>
    </div>
  );
}

export default MyProfile;
