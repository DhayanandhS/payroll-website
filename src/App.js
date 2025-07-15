import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';

// Role-based dashboards
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import PayrollProcessorDashboard from './pages/PayrollProcessorDashboard';
import SuperAdminDashboard from './pages/SuperAdminDashboard';

import { ToastContainer } from 'react-toastify'; // 🆕
import 'react-toastify/dist/ReactToastify.css'; // 🆕

// Manage Entities
import ManageUsers from './pages/ManageUsers';
import ManageEmployees from './pages/ManageEmployees';
import ManagePolicies from './pages/ManagePolicies';
import ManageAuditLogs from './pages/ManageAuditLogs';

import MyProfile from './components/profile/MyProfile';
import SubmitLeave from './components/leaves/SubmitLeave';
import SubmitTimesheet from './components/timesheets/SubmitTimesheet';
import Notifications from './components/notifications/NotificationList';

import ManagerDashboard from './pages/ManagerDashboard';
import ManageLeaveRequests from './pages/ManageLeaveRequests';
import ManageTimesheets from './pages/ManageTimesheets';

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:username" element={<MyProfile />} />

        {/* Role-based dashboard routes */}
        <Route
          path="/super_admin-dashboard"
          element={<SuperAdminDashboard />}
        />
        <Route path="/admin_hr-dashboard" element={<AdminDashboard />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route
          path="/payroll_processor-dashboard"
          element={<PayrollProcessorDashboard />}
        />
        <Route path="/manager-dashboard" element={<ManagerDashboard />} />

        {/* manage users, employees */}
        <Route path="/manage-users" element={<ManageUsers />} />
        <Route path="/manage-employees" element={<ManageEmployees />} />
        

        <Route path="/policies" element={<ManagePolicies />} />
        <Route path="/audit-logs" element={<ManageAuditLogs />} />

        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/submit-leave" element={<SubmitLeave />} />
        <Route path="/submit-timesheet" element={<SubmitTimesheet />} />
        <Route path="/notifications" element={<Notifications />} />

        <Route
          path="/manager_supervisor-dashboard"
          element={<ManagerDashboard />}
        />
        <Route path="/manage-leaves" element={<ManageLeaveRequests />} />
        <Route path="/manage-timesheets" element={<ManageTimesheets />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </Router>
  );
}

export default App;
