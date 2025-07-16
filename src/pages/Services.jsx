import React, { useEffect, useState } from 'react';
import '../styles/Services.css';
import servicesImg from '../public/services.svg'; // Add your image here

const services = [
  {
    icon: '🏷️',
    title: 'Reporting tags',
    description:
      'Create Tags, associate them with employees and get detailed, customised payroll reports to gain deeper insights.',
  },
  {
    icon: '⏰',
    title: 'Scheduled earnings',
    description:
      'Configure bonuses or variable pay for employees in advance as a part of any future pay runs.',
  },
  {
    icon: '🗓️',
    title: 'Off-cycle payrun',
    description:
      'Do not wait until the next pay run to pay the bonus and withheld salaries.',
  },
  {
    icon: '📁',
    title: 'Document management',
    description: 'Store and share employee and organizational documents.',
  },
  {
    icon: '🔐',
    title: 'Role-based access',
    description:
      'Control who sees what with secure, customizable role-based access permissions for teams and departments.',
  },
];

function Services() {
  const [visibleIndex, setVisibleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleIndex((prev) => (prev < services.length ? prev + 1 : prev));
    }, 300); // Adjust timing per card

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="services-container bg-body-tertiary">
      <div className="services-left">
        <p className="feature-label text-purple">ADVANCED FEATURES</p>
        <h2 className="services-heading">
          Powerfully engineered to back your unique processes
        </h2>
        <img
          src={servicesImg}
          alt="Service Illustration"
          className="services-img"
        />
      </div>

      <div className="services-right">
        {services.map((s, index) => (
          <div
            className={`service-card ${index < visibleIndex ? 'visible' : ''}`}
            key={index}
          >
            <h4>
              {s.icon} {s.title}
            </h4>
            <p>{s.description}</p>
            {index !== services.length - 1 && <hr />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
