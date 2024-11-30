import React, { useState } from "react";
import "../styles/_signOutPage.scss";

const SignOutPage = () => {
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = () => {
    setIsSigningOut(true);
    setTimeout(() => {
      alert("You have been signed out successfully!");
      setIsSigningOut(false);
      window.location.href = "/"; // Redirect to the homepage or login page.
    }, 2000); // Simulate a sign-out delay for realism.
  };

  const handleCancel = () => {
    alert("Sign-out cancelled.");
  };

  return (
    <div className="sign-out-page">
      <h1 className="page-title">Sign Out</h1>

      <div className="sign-out-content">
        <p>Are you sure you want to sign out?</p>
        <div className="button-group">
          <button
            className="sign-out-btn"
            onClick={handleSignOut}
            disabled={isSigningOut}
          >
            {isSigningOut ? "Signing Out..." : "Yes, Sign Out"}
          </button>
          <button className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignOutPage;
