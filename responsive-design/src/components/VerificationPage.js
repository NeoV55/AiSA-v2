import React, { useState } from 'react';
import { fetchVerificationData } from '../services/api';
import VerificationPopNote from './VerificationPopNote';
import '../styles/_verification.scss';

const VerificationPage = () => {
  const [verificationType, setVerificationType] = useState('business');
  const [inputValue, setInputValue] = useState('');
  const [status, setStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [result, setResult] = useState([]);
  const details = [
    {
      business: "Eagle Aeronautics (M) Sdn Bhd (796603-A)",
      phone: "4411223344",
      account: "9988776655",
    },
    {
      business: "Future Trade Indojaya Sdn Bhd (1003327-P)",
      phone: "9911223344",
      account: "2211334455",
    },
    {
      business: "Greenmillion Agrosolution Enterprise",
      phone: "4411223344",
      account: "9988776655",
    },
    {
      business: "Royal Gold Sdn Bhd (1005830-X)",
      phone: "7788991122",
      account: "5566778899",
    },
    {
      business: "Urustabil Sdn Bhd (545426-X)",
      phone: "7788991122",
      account: "1231231231",
    },
    { business: "JTGold", phone: "7788991122", account: "6655443322" },
    {
      business: "Iconhill Holding Sdn Bhd (810775-P)",
      phone: "7788991122",
      account: "9911223344",
    },
    {
      business: "Isothree Gold Sdn Bhd (906561-K)",
      phone: "3322114455",
      account: "6655443322",
    },
    { business: "Instaforex", phone: "3322114455", account: "6655443322" },
    { business: "RealFX", phone: "9911223344", account: "2211334455" },
    {
      business: "Prime Global Vision",
      phone: "9911223344",
      account: "1231231231",
    },
    {
      business: "Public Golden House Sdn Bhd (806825-M)",
      phone: "3322334455",
      account: "2211334455",
    },
    { business: "Softlux Sdn Bhd", phone: "3322334455", account: "9988776655" }
  ];

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetchVerificationData(verificationType, inputValue);
      setResult(response.data);
      setStatus('success');
    } catch (error) {
      setErrorMessage('Verification failed. Please try again.');
      setStatus('error');
    }
  };

  

  return (
    <div className="verification-page">
      <h2>Verification Portal</h2>
      <VerificationPopNote details={details} />

      <form onSubmit={handleVerificationSubmit}>
        <div className="form-group">
          <label>Choose verification type:</label>
          <select
            value={verificationType}
            onChange={(e) => setVerificationType(e.target.value)}
          >
            <option value="business">Business</option>
            <option value="phone">Phone Number</option>
            <option value="account">Bank Account</option>
          </select>
        </div>

        <div className="form-group">
          <label>Enter {verificationType}:</label>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            required
            placeholder={`Enter ${verificationType} details`}
          />
        </div>

        <button type="submit" className="btn-primary">
          Verify
        </button>
      </form>

      {status === 'loading' && <p>Verifying...</p>}
      {status === 'error' && <p className="error">{errorMessage}</p>}

      {status === 'success' && result.length > 0 && (
        <div>
          <h3>Verification Result:</h3>
          <table className="styled-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Value</th>
                <th>Entity Name</th>
                <th>Match Score</th>
                <th>Frequency Score</th>
                <th>Complaint Count</th>
              </tr>
            </thead>
            <tbody>
              {result.map((item, index) => (
                <tr key={index}>
                  <td>{item.type}</td>
                  <td>{item.value}</td>
                  <td>{item.entity_name}</td>
                  <td>{item.match_score}</td>
                  <td>{item.frequency_score}</td>
                  <td>{item.complaint_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VerificationPage;
