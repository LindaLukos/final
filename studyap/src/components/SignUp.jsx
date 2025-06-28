// src/pages/Signup.jsx
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Checkbox, FormControlLabel } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    contact: '',
    password: '',
    confirmPassword: '',
    agreed: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async () => {
    if (form.password !== form.confirmPassword) {
      return alert('Passwords do not match.');
    }
    if (!form.agreed) {
      return alert('You must agree to terms and conditions.');
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', form);
      alert('Signup successful! Please login.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 5 }}>
      <Typography variant="h5">Sign Up</Typography>
      <TextField label="Name" name="name" fullWidth margin="normal" onChange={handleChange} />
      <TextField label="Email" name="email" type="email" fullWidth margin="normal" onChange={handleChange} />
      <TextField label="Contact Number" name="contact" fullWidth margin="normal" onChange={handleChange} />
      <TextField label="Password" name="password" type="password" fullWidth margin="normal" onChange={handleChange} />
      <TextField label="Confirm Password" name="confirmPassword" type="password" fullWidth margin="normal" onChange={handleChange} />
      <FormControlLabel
        control={<Checkbox checked={form.agreed} onChange={handleChange} name="agreed" />}
        label="I agree to terms and conditions"
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>Sign Up</Button>
    </Box>
  );
};

export default Signup;
