import React from 'react';
import SupportBanner from './SupportBanner';
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';
import '../../styles/Support.css'; // If you need extra styles

const SupportPage = () => {
  return (
    <div className="support-wrapper bg-light">
      <SupportBanner />
      <div className="container py-5">
        <div className="row">
          <div className="col-md-6 mb-4">
            <ContactInfo />
          </div>
          <div className="col-md-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
