import React from 'react';
import IntegrationBanner from './IntegrationBanner';
import IntegrationCard from './IntegrationCard';

import peopleIcon from '../../public/people.svg';    // Add SVGs or PNGs
import booksIcon from '../../public/books.svg';
import expenseIcon from '../../public/expense.svg';
import practiceIcon from '../../public/practice.svg';

const integrations = [
  {
    icon: peopleIcon,
    title: 'EasyPay People',
    description: 'Take control of the complete employee journey with our cloud-based HRMS software. Enrol staff, manage work hours, and tab their leave policies.',
    link: '#',
    linkText: 'HR software integration',
  },
  {
    icon: booksIcon,
    title: 'EasyPay Books',
    description: 'GST-compliant accounting software that records your payroll transactions automatically, reducing manual errors.',
    link: '#',
    linkText: 'Accounting software integration',
  },
  {
    icon: expenseIcon,
    title: 'EasyPay Expense',
    description: 'Reimburse business expenses alongside payroll. Automate travel, reporting, and expense tracking.',
    link: '#',
    linkText: 'Expense software integration',
  },
  {
    icon: practiceIcon,
    title: 'EasyPay Practice',
    description: 'Centralizes client management for accounting firms. Real-time collaboration and simplified tax management.',
    link: '#',
    linkText: 'Explore EasyPay Practice now',
  },
];

const IntegrationsPage = () => {
  return (
    <div className="support-wrapper bg-white">
      <IntegrationBanner />
      <div className="container py-5">
        <h4 className="fw-bold text-center mb-4">In-house integrations for your HR and accounting needs in payroll</h4>
        <div className="row">
          {integrations.map((item, idx) => (
            <IntegrationCard key={idx} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntegrationsPage;
