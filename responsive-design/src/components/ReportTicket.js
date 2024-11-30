import React, { useState } from 'react';
import { submitTicket } from '../services/api';
import '../styles/_reportticket.scss';


const mockChatData = [
  { sender: "Support Bot", message: "Hello! How can I assist you today?" },
  { sender: "User", message: "I need help with a service issue." },
  { sender: "Support Bot", message: "Sure, please provide some details." },
];

const ReportTicket = () => {
  const [formData, setFormData] = useState({
    victimName: "",
    contact: "",
    email: "",
    caseDescription: "",
    companyName: "",
    phone: "",
    accountNumber: "",
  });

  const [tickets, setTickets] = useState([]);
  const [chatHistory, setChatHistory] = useState(mockChatData);
  const [chatInput, setChatInput] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (chatInput.trim()) {
      setChatHistory([
        ...chatHistory,
        { sender: "User", message: chatInput.trim() },
      ]);
      setChatInput("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTicket = {
      ...formData,
      caseId: `C${Date.now()}`, // Generate case ID based on timestamp
      status: "Open",
      updates: ["Initial case created."],
      chatHistory: [...chatHistory],
    };
    try {
      await submitTicket(newTicket);
      setTickets([...tickets, newTicket]);
      alert("Ticket submitted successfully!");
      setFormData({
        victimName: "",
        contact: "",
        email: "",
        caseDescription: "",
        companyName: "",
        phone: "",
        accountNumber: "",
      });
    } catch (error) {
      console.error("Error submitting ticket:", error);
      alert("Error submitting ticket");
    }
  };

  return (
    <div className="ticket-submit-page">
      <h1 className="page-title">Submit a Report Ticket</h1>
      <div className="page-layout">
        <div className="chat-window">
          <h2>Support Chat</h2>
          <div className="chat-box">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`chat-message ${
                  chat.sender === "User" ? "user" : "bot"
                }`}
              >
                <strong>{chat.sender}:</strong> <span>{chat.message}</span>
              </div>
            ))}
          </div>
          <form onSubmit={handleChatSubmit} className="chat-input-form">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type a message..."
              required
            />
            <button type="submit">Send</button>
          </form>
        </div>

        <div className="ticket-form">
          <h2>Ticket Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Victim Name:</label>
              <input
                type="text"
                name="victimName"
                value={formData.victimName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Contact:</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Case Description:</label>
              <textarea
                name="caseDescription"
                value={formData.caseDescription}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label>Company Name:</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Company Phone:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Account Number:</label>
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleInputChange}
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Submit Ticket
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportTicket;


