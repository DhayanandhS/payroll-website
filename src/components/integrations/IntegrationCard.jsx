import React from 'react';

const IntegrationCard = ({ icon, title, description, link, linkText }) => {
  return (
    <div className="col-md-6 mb-4">
      <div className="card h-100 shadow-sm border-0">
        <div className="card-body">
          <div className="d-flex align-items-center mb-2">
            <img src={icon} alt={title} style={{ width: '32px', marginRight: '10px' }} />
            <h5 className="mb-0 fw-semibold">{title}</h5>
          </div>
          <p className="text-muted">{description}</p>
          <a href={link} className="text-primary text-decoration-none">
            {linkText} →
          </a>
        </div>
      </div>
    </div>
  );
};

export default IntegrationCard;
