import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_zqij6cs';
const TEMPLATE_ID = 'template_aubrqvd';
const PUBLIC_KEY = '0JNq_bo1ZYrQuD58Q';

const MessageForm = ({ onAddMessage }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Form Data:', formData);
    onAddMessage(formData);

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY)
      .then(() => {
        alert('Message sent!');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch((err) => {
        console.error('EmailJS error:', err);
        alert(`Failed to send email: ${err.text || JSON.stringify(err)}`);
      });
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
        style={inputStyle}
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        type="email"
        required
        style={inputStyle}
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Message"
        required
        style={textareaStyle}
      />
      <button type="submit" style={buttonStyle}>Send & Save</button>
    </form>
  );
};

// Styling for the form and inputs
const formStyle = {
  marginBottom: '2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const inputStyle = {
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontSize: '14px',
};

const textareaStyle = {
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontSize: '14px',
  minHeight: '100px',
};

const buttonStyle = {
  padding: '10px 20px',
  borderRadius: '5px',
  border: 'none',
  backgroundColor: '#4CAF50',
  color: 'white',
  fontSize: '14px',
  cursor: 'pointer',
};

export default MessageForm;
