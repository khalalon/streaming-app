import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapLocation } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faWhatsapp, faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons';
import tfcLogo from '../assets/tfc.jpg'; // Adjusted the image path
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src={tfcLogo} alt="TFC Logo" className="tfc-image" />
        </div>
        <div className="footer-links">
          <div className="social-media">
            <a href="https://www.facebook.com/tfc.event1" className="social-icon facebook">
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
            <a href="https://www.youtube.com/@TFC.events" className="social-icon youtube">
              <FontAwesomeIcon icon={faYoutube} size="2x" />
            </a>
            <a href="https://www.instagram.com/tfc_event/" className="social-icon instagram">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
          </div>
          <div className="contact-info">
            <div className="contact-item">
              <FontAwesomeIcon icon={faWhatsapp} size="2x" />
              <div className="contact-details">
                <a href="https://wa.me/+21620241649"><p>+216 20241649</p></a>
                <a href="https://wa.me/+13133777874"><p>+131 33777874</p></a>
              </div>
            </div>
            <div className="contact-item">
              <FontAwesomeIcon icon={faEnvelope} size="2x" />
              <div className="contact-details">
                <p>ellouzisabeur@gmail.com</p>
                <p>contact@tfc-event.com</p>
              </div>
            </div>
            <div className="contact-item">
              <FontAwesomeIcon icon={faPhone} size="2x" />
              <p>+216 98241649</p>
            </div>
            <div className="contact-item">
              <FontAwesomeIcon icon={faMapLocation} size="2x" />
              <div className="contact-details">
                <p>7529, Orchard Ave</p>
                <p>Dearborn, Mi.48126</p>
                <p>USA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 DrivenD, All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
