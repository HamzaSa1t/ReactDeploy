import React, { useState } from 'react';
import api from '../api';  
import { getCookie } from '../utils/getCookie'; 

function EmailForm() { 
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
       const response = await api.post('api/send-email/', { email: email }); 
      if (response.status === 200 || response.status === 201) {
        alert('Email sent successfully!');
        setEmail('');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container" encType="multipart/form-data">
      <h1>enter your email</h1>
      <input
        className="form-input"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your email"
      />
      <button type="submit" style={{
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        margin: '20px 0',
        fontWeight: 'bold',
        fontSize: '16px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
      }}>
        CHECK OUT
      </button>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default EmailForm;