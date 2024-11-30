import React, { useState } from "react";
import "../styles/_userSettingsPage.scss";

const UserSettingsPage = () => {
  const [userData, setUserData] = useState({
    username: "johndoe",
    email: "johndoe@example.com",
    phone: "+60123456789",
    twoFactorAuth: true,
    accountStatus: "Active",
  });

  const [passwordChange, setPasswordChange] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordChange({ ...passwordChange, [name]: value });
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordChange.newPassword !== passwordChange.confirmPassword) {
      alert("New password and confirm password do not match.");
    } else {
      alert("Password changed successfully!");
      setPasswordChange({ currentPassword: "", newPassword: "", confirmPassword: "" });
    }
  };

  const toggleTwoFactorAuth = () => {
    setUserData({ ...userData, twoFactorAuth: !userData.twoFactorAuth });
    alert(
      userData.twoFactorAuth
        ? "Two-factor authentication disabled."
        : "Two-factor authentication enabled."
    );
  };

  return (
    <div className="user-settings-page">
      <h1 className="page-title">User Settings</h1>

      {/* Profile Section */}
      <div className="settings-section">
        <h2 className="section-title">Profile Settings</h2>
        <div className="setting-item">
          <span>Username:</span>
          <span>{userData.username}</span>
        </div>
        <div className="setting-item">
          <span>Email:</span>
          <span>{userData.email}</span>
        </div>
        <div className="setting-item">
          <span>Phone:</span>
          <span>{userData.phone}</span>
        </div>
        <div className="setting-item">
          <span>Account Status:</span>
          <span className={`status ${userData.accountStatus.toLowerCase()}`}>
            {userData.accountStatus}
          </span>
        </div>
      </div>

      {/* Security Section */}
      <div className="settings-section">
        <h2 className="section-title">Security Settings</h2>
        <div className="setting-item">
          <span>Two-Factor Authentication:</span>
          <button className="toggle-btn" onClick={toggleTwoFactorAuth}>
            {userData.twoFactorAuth ? "Disable" : "Enable"}
          </button>
        </div>

        <form onSubmit={handlePasswordChange} className="password-change-form">
          <h3>Change Password</h3>
          <div className="form-group">
            <label htmlFor="currentPassword">Current Password</label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={passwordChange.currentPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={passwordChange.newPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={passwordChange.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserSettingsPage;
