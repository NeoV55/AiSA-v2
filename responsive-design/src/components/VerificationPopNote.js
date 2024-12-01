import React, { useState } from 'react';
import '../styles/_popnote.scss';
import Button from './Button';

const VerificationPopNote = ({ details, onVerify }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    // Function to copy individual data to clipboard
    const handleCopy = (text) => {
      navigator.clipboard.writeText(text);
      alert(`Copied: ${text}`);
    };
  
    return (
      <>
        {/* Trigger Button */}
        <Button onClick={() => setIsOpen(true)} className="pop-note-trigger">
          Demo Data For Testing
        </Button>
  
        {/* Pop Note Modal */}
        {isOpen && (
          <div className="pop-note-modal">
            <div className="pop-note-content">
              <h2>Business Details</h2>
              <ul>
                {details.map((item, index) => (
                  <li key={index} className="pop-note-item">
                    <p>
                      <strong>Business:</strong> {item.business}{" "}
                      <button onClick={() => handleCopy(item.business)}>
                        Copy
                      </button>
                    </p>
                    <p>
                      <strong>Phone:</strong> {item.phone}{" "}
                      <button onClick={() => handleCopy(item.phone)}>Copy</button>
                    </p>
                    <p>
                      <strong>Account:</strong> {item.account}{" "}
                      <button onClick={() => handleCopy(item.account)}>
                        Copy
                      </button>
                    </p>
                    <div className="pop-note-actions">
                      {/* Redirect to Verification Portal */}
                      
                    </div>
                  </li>
                ))}
              </ul>
              <button className="pop-note-close" onClick={() => setIsOpen(false)}>
                Close
              </button>
            </div>
          </div>
        )}
      </>
    );
  };
  
  export default VerificationPopNote;