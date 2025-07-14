import React, { useEffect, useState } from 'react';
import notificationService from '../../services/notificationService';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

function NotificationList() {
  const [notifications, setNotifications] = useState([]);
  const [userName, setUserName] = useState(null);

  // Step 1: Decode token and extract username
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.sub); // usually 'sub' is the username
      } catch (err) {
        toast.error('Invalid token');
        console.error('JWT decode error:', err);
      }
    }
  }, []);

  // Step 2: Fetch all notifications and filter by username
  useEffect(() => {
    if (userName) {
      fetchNotifications();
    }
  }, [userName]);

  const fetchNotifications = async () => {
    try {
      const res = await notificationService.getAllNotifications(); // 🔁 GET ALL
      const allNotifications = Array.isArray(res.data) ? res.data : [res.data];

      // 🔍 Filter notifications by logged-in username
      const userNotifications = allNotifications.filter(
        (note) => note.userName?.toLowerCase() === userName?.toLowerCase()
      );

      setNotifications(userNotifications);
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
      toast.error('Failed to fetch notifications.');
    }
  };

  return (
    <div className="container mt-4">
      <h3>My Notifications</h3>
      {notifications.length === 0 ? (
        <p>No notifications found.</p>
      ) : (
        <ul className="list-group">
          {notifications.map((note) => (
            <li
              key={note.notificationId}
              className={`list-group-item d-flex justify-content-between align-items-start ${
                note.status === 'UNREAD' ? 'list-group-item-warning' : ''
              }`}
            >
              <div>
                <div className="fw-bold">{note.message}</div>
                <small className="text-muted">
                  {note.type} • {new Date(note.createdOn).toLocaleString()}
                </small>
              </div>
              <span
                className={`badge bg-${
                  note.status === 'UNREAD' ? 'danger' : 'success'
                } rounded-pill`}
              >
                {note.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NotificationList;
