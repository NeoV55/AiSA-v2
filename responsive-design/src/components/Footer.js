import React from 'react';
import '../styles/main.scss';
import '../styles/_footer.scss';
import coverImage from '../assets/nsrc-2.jpg';
import appImage from '../assets/applogos.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__header">
        <img
          src={coverImage} // Replace with the actual path to your cover image or logo
          alt="Page Cover"
          className="footer__header-image"
        />
      </div>
      <div className="footer__logo">National Financial Anti Crime Centre (NFCC)</div>
      <div className="footer__content">
        <div className="footer__section">
          <h4>Sitemap</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/vsupport">Victim Support</a></li>
            <li><a href="/">AiSA: Your Online Guardian</a></li>
            <li><a href="/dashboard">NFCC Dashboard</a></li>
            <li><a href="/cpanel">NFCC cPanel</a></li>
            <li><a href="/help">Technical Support</a></li>
            <li><a href="/settings">Settings</a></li>
            <li><a href="/signout">Sign Out</a></li>
          </ul>
        </div>
        <div className="footer__section">
          <h4>Download Our App</h4>
          <div className="footer__apps">
            <img src={appImage} alt="App Store" />
          </div>
        </div>
        <div className="footer__section">
          <h4>Contact</h4>
          <p>Email: support@localhost.com</p>
          <p>Phone: +60 16 010 0101</p>
        </div>
      </div>
      <div className="footer__info">
        <p>&copy; 2024 Nusantara Sibernetiks. All Rights Reserved.</p>
        <p>
          <a href="/terms">Terms of Service</a> | <a href="/privacy">Privacy Policy</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
