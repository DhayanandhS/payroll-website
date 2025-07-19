import React from 'react';
import { jwtDecode } from 'jwt-decode';
import '../styles/Home.css';
import CountUp from 'react-countup';

function Home() {
  const token = localStorage.getItem('token');

  let role = null;
  let username = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.role;
      username = decoded.sub;
    } catch (err) {
      console.error('Invalid token');
    }
  }

  return (
    <>
      {/* HOME DIV 1 */}
      <div className="home-wrapper">
        <h1 className="welcome-heading">
          <span className="brand-flip">easypay</span>
        </h1>
        <div className="home-card">
          {!token ? (
            <>
              <p className="subtitle">
                Streamline payroll, attendance, and HR processes with one smart
                solution. EasyPay empowers organizations to manage everything
                with ease, accuracy, and speed.
              </p>
              <div class="auth-links">
                <a href="/register" class="arrow-link">
                  Register
                </a>
                <a href="/login" class="arrow-link">
                  Login
                </a>
              </div>
            </>
          ) : (
            <div className="user-info">
              <h4>
                Hello, <strong>{username}</strong>
              </h4>
              {role === 'SUPER_ADMIN' && (
                <p>
                  As a <strong>Super Admin</strong>, you have full control over
                  the system. You can manage all modules, assign roles, monitor
                  platform-wide activities, and ensure seamless operations
                  across the entire organization.
                </p>
              )}
              {role === 'ADMIN_HR' && (
                <p>
                  As an <strong>Admin HR</strong>, you can manage users, oversee
                  employee records, configure payroll policies, and audit system
                  activity.
                </p>
              )}
              {role === 'EMPLOYEE' && (
                <p>
                  You're logged in as an <strong>Employee</strong>. Submit
                  timesheets, manage leave, and view your payrolls from the
                  dashboard.
                </p>
              )}
              {role === 'PAYROLL_PROCESSOR' && (
                <p>
                  As a <strong>Payroll Processor</strong>, handle salary
                  disbursements, taxes, and benefit allocation efficiently.
                </p>
              )}
              {role === 'MANAGER_SUPERVISOR' && (
                <p>
                  You're a <strong>Manager/Supervisor</strong>. Oversee and
                  approve your team's activities.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      {/* HOME DIV 2 */}
      <div className="home-overview">
        <h2 className="overview-title">Why EasyPay?</h2>
        <p className="overview-desc">
          EasyPay simplifies every aspect of payroll, attendance tracking, leave
          management, and role-based access with modern, secure, and intuitive
          features built for organizations of all sizes.
        </p>

        <div className="feature-cards">
          <div className="feature-box">
            <h4>⚡ Real-time Payroll</h4>
            <p>
              Generate and manage payroll instantly with built-in automation.
            </p>
          </div>
          <div className="feature-box">
            <h4>📊 Attendance Insights</h4>
            <p>Track working hours, leaves, and absenteeism with precision.</p>
          </div>
          <div className="feature-box">
            <h4>🔐 Role-based Access</h4>
            <p>
              Give each team member the access they need — no more, no less.
            </p>
          </div>
        </div>
      </div>
      {/* HOME DIV 3 */}
      <div className="compare-section">
        <h2 className="compare-heading">Why Switch to EasyPay?</h2>

        <div className="flip-card-grid">
          {/* Payroll Comparison */}
          <div className="flip-card">
            <div className="flip-inner">
              <div className="flip-front">
                <h4>Manual Payroll</h4>
                <p>
                  Spreadsheets, delays, and miscalculations increase stress and
                  errors.
                </p>
              </div>
              <div className="flip-back">
                <h4>EasyPay Payroll</h4>
                <p>
                  Automated calculations, accurate payouts, and complete
                  compliance.
                </p>
              </div>
            </div>
          </div>

          {/* Leave Management */}
          <div className="flip-card">
            <div className="flip-inner">
              <div className="flip-front">
                <h4>Manual Leave</h4>
                <p>Paper forms, manager delays, and scattered records.</p>
              </div>
              <div className="flip-back">
                <h4>EasyPay Leave</h4>
                <p>
                  Digital requests, real-time tracking, and automatic approvals.
                </p>
              </div>
            </div>
          </div>

          {/* Tax & Compliance */}
          <div className="flip-card">
            <div className="flip-inner">
              <div className="flip-front">
                <h4>Manual Compliance</h4>
                <p>Manual form fill-ups and last-minute government filings.</p>
              </div>
              <div className="flip-back">
                <h4>EasyPay Compliance</h4>
                <p>Built-in tax forms and automatic regulatory updates.</p>
              </div>
            </div>
          </div>

          {/* Data Access */}
          <div className="flip-card">
            <div className="flip-inner">
              <div className="flip-front">
                <h4>Scattered Data</h4>
                <p>
                  Files across systems, email chains, and version mismatches.
                </p>
              </div>
              <div className="flip-back">
                <h4>EasyPay Dashboard</h4>
                <p>
                  Central access to all records, reports, and analytics in one
                  place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* HOME DIV 4 */}
      <div className="home-final-cta">
        <h2 className="cta-heading">
          Ready to Streamline Your payroll Operations?
        </h2>
        <p className="cta-subtext">
          Join thousands of companies who trust{' '}
          <span className="highlight">EasyPay</span> to simplify their payroll,
          manage teams effortlessly, and reclaim valuable time.
        </p>
      </div>
      {/* HOME DIV 4 - Metrics */}
      <div className="home-metrics">
        <h2 className="metrics-heading">Our Impact in Numbers</h2>
        <div className="metrics-grid">
          <div className="metric-box">
            <h3>
              <CountUp end={500} duration={10} separator="," />
            </h3>
            <p>Payrolls Processed</p>
          </div>
          <div className="metric-box">
            <h3>
              <CountUp end={150} duration={10} separator="," />
            </h3>
            <p>Employees Served</p>
          </div>
          <div className="metric-box">
            <h3>
              <CountUp end={120} duration={10} />
            </h3>
            <p>Companies Onboarded</p>
          </div>
          <div className="metric-box">
            <h3>
              <CountUp end={99.9} duration={10} decimals={1} />%
            </h3>
            <p>Accuracy Rate</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
