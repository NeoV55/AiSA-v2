import React from 'react';
import '../styles/main.scss';
import '../styles/_header.scss';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="header">
      {/* Logo */}
      <div className="header__logo">
        Portal Pencegahan Jenayah Kewangan Nasional (NFCC)
      </div>

      {/* Navigation Links */}
      <nav className="header__nav">
        <ul>
          <li><a href="/verification">Verification</a></li>
          <li><a href="/reporting">Report</a></li>
          <li><a href="/social">SocialMedia</a></li>
          <li><a href="/news">News</a></li>
          <li><a href="/">AiSA</a></li>
        </ul>
      </nav>

      {/* Search Bar */}
      <div className="header__search">
        <input 
          type="text" 
          placeholder="Search..." 
          className="header__search-input" 
        />
        <button className="header__search-button">Search</button>
      </div>

      {/* Social Links */}
      <div className="header__social">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="header__social-link">WhatsApp</a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="header__social-link">Telegram</a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="header__social-link">Phone</a>
      </div>

      {/* Buttons */}
      <div className="header__buttons">
        <button className="button" onClick={() => navigate('/login')}>Login</button>
        <button className="button button--secondary" onClick={() => navigate('/register')}>Register</button>
      </div>
    </header>
  );
};

export default Header;
