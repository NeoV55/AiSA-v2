import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { loginUser } from '../services/api';
import '../styles/_login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);
      if (response.data.length > 0) {
        alert('Login successful!');
        navigate("/");
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Error connecting to the server');
    }
  };

  return (
    <div className="homepage">
      <div className="login-section">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
