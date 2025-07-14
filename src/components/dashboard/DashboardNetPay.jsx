import React, { useEffect, useState } from 'react';
import payrollService from '../../services/payrollService';

function DashboardNetPay() {
  const [totalNetPay, setTotalNetPay] = useState(0);

  useEffect(() => {
    const fetchNetPay = async () => {
      try {
        const response = await payrollService.getAllPayrolls();
        const allPayrolls = response.data;

        const sum = allPayrolls.reduce((acc, payroll) => acc + payroll.netPay, 0);
        setTotalNetPay(sum);
      } catch (err) {
        console.error('Error fetching payrolls:', err);
      }
    };

    fetchNetPay();
  }, []);

  return (
    <>
      ₹{totalNetPay.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
    </>
  );
}

export default DashboardNetPay;
