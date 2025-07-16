import React from 'react';

const ContactForm = () => {
  return (
    <div className="contact-form">
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
  );
};

export default ContactForm;
