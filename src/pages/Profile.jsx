import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

function Profile() {
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/users/${decoded.sub}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUserData(res.data))
      .catch((err) => console.error('Error fetching profile:', err));
  }, [token]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:8080/api/users/${decoded.sub}`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => alert('Profile updated!'))
      .catch((err) => alert('Update failed.'));
  };

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>Your Profile</h2>
      <div className="mb-3">
        <label>Name:</label>
        <input className="form-control" name="firstName" value={userData.firstName} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label>Email:</label>
        <input className="form-control" name="email" value={userData.email} onChange={handleChange} />
      </div>
      {/* Add more fields as needed */}
      <button className="btn btn-primary" onClick={handleUpdate}>
        Update Profile
      </button>
    </div>
  );
}

export default Profile;
