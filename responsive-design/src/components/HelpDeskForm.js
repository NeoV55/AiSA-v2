import React, { useState } from "react";
import "../styles/_helpDeskForm.scss";

const HelpDeskForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    outageType: "",
    severity: "",
    requestType: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted successfully!");
    console.log("Submitted Data:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      outageType: "",
      severity: "",
      requestType: "",
      description: "",
    });
  };

  return (
    <div className="help-desk-form">
      <h1 className="form-title">Help Desk Request</h1>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Outage Type */}
        <div className="form-group">
          <label htmlFor="outageType">Outage Type</label>
          <select
            id="outageType"
            name="outageType"
            value={formData.outageType}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Outage Type</option>
            <option value="Network">Network</option>
            <option value="Server">Server</option>
            <option value="Database">Database</option>
            <option value="Application">Application</option>
          </select>
        </div>

        {/* Severity */}
        <div className="form-group">
          <label htmlFor="severity">Severity</label>
          <select
            id="severity"
            name="severity"
            value={formData.severity}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Severity</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>

        {/* Request Type */}
        <div className="form-group">
          <label htmlFor="requestType">Request Type</label>
          <select
            id="requestType"
            name="requestType"
            value={formData.requestType}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Request Type</option>
            <option value="Issue">Issue</option>
            <option value="Implementation">Implementation</option>
            <option value="Integration">Integration</option>
            <option value="Edits">Edits</option>
            <option value="AI">AI</option>
            <option value="Datasets">Datasets</option>
            <option value="Functions">Functions</option>
            <option value="UI/UX">UI/UX</option>
            <option value="Errors">Errors</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe your issue/request"
            rows="5"
            required
          ></textarea>
        </div>

        {/* Submit */}
        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Submit Request
          </button>
        </div>
      </form>

      {/* Direct Call Buttons */}
      <div className="direct-contact">
        <h3>Contact Us Directly</h3>
        <button className="contact-btn" onClick={() => alert("Calling via WhatsApp...")}>
          Call via WhatsApp
        </button>
        <button className="contact-btn" onClick={() => alert("Calling via Phone...")}>
          Call via Phone
        </button>
        <button className="contact-btn" onClick={() => alert("Calling via Telegram...")}>
          Call via Telegram
        </button>
      </div>
    </div>
  );
};

export default HelpDeskForm;
