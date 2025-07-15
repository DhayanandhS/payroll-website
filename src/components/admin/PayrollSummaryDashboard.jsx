import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import payrollService from '../../services/payrollService';
import '../../styles/PayrollDashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function PayrollSummaryDashboard() {
  const [monthlyNetPay, setMonthlyNetPay] = useState({});
  const [totalTDS, setTotalTDS] = useState(0);
  const [totalEPF, setTotalEPF] = useState(0);
  const [totalESI, setTotalESI] = useState(0);

  useEffect(() => {
    payrollService.getAllPayrolls().then((res) => {
      const data = res.data;

      const monthlyMap = {};
      let tdsSum = 0;
      let epfSum = 0;
      let esiSum = 0;

      data.forEach((payroll) => {
        const month = `${payroll.month} ${payroll.year}`;
        monthlyMap[month] = (monthlyMap[month] || 0) + payroll.netPay;

        tdsSum += payroll.tax;
        epfSum += payroll.baseSalary * 0.12;
        esiSum += payroll.baseSalary * 0.0175;
      });

      // Get the last 6 months only
      const sortedMonths = Object.keys(monthlyMap).sort((a, b) => {
        return new Date(`1 ${a}`) - new Date(`1 ${b}`);
      });

      const last6 = sortedMonths.slice(-6);
      const trimmedMap = {};
      last6.forEach((month) => {
        trimmedMap[month] = monthlyMap[month];
      });

      setMonthlyNetPay(trimmedMap);
      setTotalTDS(tdsSum);
      setTotalEPF(epfSum);
      setTotalESI(esiSum);
    });
  }, []);

  const chartData = {
    labels: Object.keys(monthlyNetPay),
    datasets: [
      {
        label: 'Net Pay',
        data: Object.values(monthlyNetPay),
        backgroundColor: 'rgba(255, 255, 255, 0.25)', // 🤍 Softer color
        borderColor: 'rgba(255, 255, 255, 0.4)',
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // 🔇 No legend
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            return `₹ ${context.raw.toLocaleString('en-IN')}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // ✅ Remove vertical gridlines
        },
        ticks: {
          color: '#ddd',
          font: {
            size: 12,
            family: 'Segoe UI',
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.08)', // ✅ Faint horizontal lines
          borderDash: [3, 3],
        },
        ticks: {
          color: '#bbb',
          font: {
            size: 12,
          },
          callback: function (value) {
            return `₹${value / 1000}k`;
          },
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 6,
        borderSkipped: false,
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 0,
        right: 0,
      },
    },
    animation: {
      duration: 800,
      easing: 'easeOutQuart',
    },
  };

  return (
    <div className="payroll-dashboard-wrapper">
      <div className="payroll-dashboard-overlay" />

      <h3 className="chart-heading">📊 Monthly Net Pay Overview</h3>
      <div className="payroll-flex-container">
        <div className="chart-container">
          <Bar data={chartData} options={chartOptions} />
        </div>

        <div className="deductions-container">
          <div className="card text-white mb-3">
            <div className="card-body hover-card-body">
              <div className="card-main">
                <h5 className="card-title">TDS (Tax)</h5>
                <p className="card-text">₹ {totalTDS.toFixed(2)}</p>
              </div>
              <div className="card-desc">
                <p>Tax Deducted at Source is calculated based on income.</p>
              </div>
            </div>
          </div>

          <div className="card text-white mb-3">
            <div className="card-body hover-card-body">
              <div className="card-main">
                <h5 className="card-title">EPF (12%)</h5>
                <p className="card-text">₹ {totalEPF.toFixed(2)}</p>
              </div>
              <div className="card-desc">
                <p>
                  Employee Provident Fund ensures long-term savings by
                  contributing 12% of the base salary.
                </p>
              </div>
            </div>
          </div>

          <div className="card text-white mb-3">
            <div className="card-body hover-card-body">
              <div className="card-main">
                <h5 className="card-title">ESI (1.75%)</h5>
                <p className="card-text">₹ {totalESI.toFixed(2)}</p>
              </div>
              <div className="card-desc">
                <p>
                  The Employee State Insurance covers health and medical
                  benefits through a 1.75% salary contribution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PayrollSummaryDashboard;
