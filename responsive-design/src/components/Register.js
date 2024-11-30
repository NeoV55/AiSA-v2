import React, { useState } from 'react';
import { registerUser } from '../services/api';
import Button from './Button';
import '../styles/_form.scss';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Registration data:', formData);
    try {
      await registerUser(formData); // Save user
      alert('User registered successfully!');
      setFormData({ name: '', email: '', password: '' }); // Reset form
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="form__input"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="form__input"
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="form__input"
        />
        <Button type="submit" className="form__button">Register</Button>
      </form>
    </div>
  );
};

export default Register;
