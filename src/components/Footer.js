import React from 'react';
import { Mail, MapPin, Phone, Users, ShieldCheck, ClipboardList, Activity } from 'lucide-react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        {/* Left - Logo & Description */}
        <div className="footer-col brand-col">
          <div className="logo-box">
            <div className="logo-icon">EP</div>
            <h3 className="logo-text">EasyPay</h3>
          </div>
          <p className="footer-desc">
            Modern payroll and HR management system designed for businesses of all sizes. 
            Streamline your workforce operations with our comprehensive solution.
          </p>
          <div className="social-icons">
            <i className="fab fa-facebook-f" />
            <i className="fab fa-twitter" />
            <i className="fab fa-linkedin-in" />
            <i className="fab fa-instagram" />
          </div>
        </div>

        {/* Middle - Quick Links */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li>Home</li>
            <li>Dashboard</li>
            <li>Management</li>
            <li>Support</li>
            <li>Documentation</li>
          </ul>
        </div>

        {/* Services */}
        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            <li><Users size={16} /> User Management</li>
            <li><ClipboardList size={16} /> Policy Management</li>
            <li><Activity size={16} /> Audit & Compliance</li>
            <li><ShieldCheck size={16} /> Security & Access Control</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col contact-col">
          <h4>Contact Us</h4>
          <p><MapPin size={16} /> 123 Business Avenue, Suite 100, New York, NY 10001</p>
          <p><Phone size={16} /> +1 (555) 123-4567</p>
          <p><Mail size={16} /> support@easypay.com</p>

          <h5>Stay Updated</h5>
          <div className="subscribe-box">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>© 2024 EasyPay. All rights reserved. Built with ❤️ for modern businesses.</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
