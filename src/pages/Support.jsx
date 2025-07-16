import React from 'react';
import '../styles/Support.css'; // optional custom styles
import { Envelope, Phone, Globe, Instagram, Facebook, Linkedin } from 'react-bootstrap-icons'; // or font-awesome

function SupportPage() {
  return (
    <div className="support-wrapper bg-light">
      {/* Welcome Banner */}
      <div className="support-banner text-center py-5" style={{ backgroundColor: '#fdece6' }}>
        <h1 className="fw-bold">Contact Us</h1>
        <h5 className="mt-3 text-secondary">Not finding what you are looking for?</h5>
        <p className="text-muted">Reach out to us and we will help you out.</p>
      </div>

      {/* Main Section */}
      <div className="container py-5">
        <div className="row">
          {/* Left Side: Contact Info */}
          <div className="col-md-6 mb-4">
            <h5 className="fw-bold">Monday to Friday (9:00 AM to 7:00 PM)</h5>
            <div className="mt-3 d-flex align-items-center gap-2">
              <Envelope /> support@yourdomain.com
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

          {/* Right Side: Contact Form */}
          <div className="col-md-6">
            <h4 className="fw-semibold">Get in touch with us</h4>
            <p className="text-muted">Send us your questions and suggestions. We will get back to you at the earliest.</p>

            <form>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="name" placeholder="Name" required />
                <label htmlFor="name">Name *</label>
              </div>

              <div className="form-floating mb-3">
                <input type="email" className="form-control" id="email" placeholder="Email" required />
                <label htmlFor="email">Email *</label>
              </div>

              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="mobile" placeholder="Mobile number" required />
                <label htmlFor="mobile">Mobile number</label>
              </div>

              <div className="form-floating mb-3">
                <textarea className="form-control" placeholder="Message" id="message" style={{ height: '120px' }} required></textarea>
                <label htmlFor="message">Message *</label>
              </div>

              <p className="small text-muted">
                By clicking Submit, you agree to our <a href="/">Privacy Policy</a>
              </p>

              <button type="submit" className="btn btn-danger w-100">SUBMIT</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupportPage;
