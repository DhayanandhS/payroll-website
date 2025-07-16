import React from 'react';
import { Envelope, Phone, Globe, Instagram, Facebook, Linkedin } from 'react-bootstrap-icons';

const ContactInfo = () => {
  return (
    <div className="contact-info">
      <h5 className="fw-bold">Monday to Friday (9:00 AM to 7:00 PM)</h5>
      <div className="mt-3 d-flex align-items-center gap-2">
        <Envelope /> support@easypay.com
      </div>
      <div className="mt-2 d-flex align-items-center gap-2">
        <Phone /> 18001234567
      </div>
      <div className="mt-2 d-flex align-items-center gap-2">
        <Globe /> Forum
      </div>

      <h6 className="fw-bold mt-4">Other resources</h6>
      <div className="d-flex gap-4 mt-2">
        <div>📄 Help</div>
        <div>💬 FAQs</div>
        <div>🎥 Webinar</div>
      </div>

      <h6 className="fw-bold mt-4">We’re social too</h6>
      <div className="d-flex gap-3 mt-2 fs-4">
        <Instagram />
        <Facebook />
        <Linkedin />
      </div>
    </div>
  );
};

export default ContactInfo;
