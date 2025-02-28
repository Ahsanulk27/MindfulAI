import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const userEmail = ''; // Make sure to get the user's email from context or props

  const handleVerify = async () => {
    try {
      const response = await fetch('https://api.malaysiabdmartshop.com/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail, otp }), // Include email if needed
      });

      if (response.ok) {
        alert('OTP verified successfully! You are now logged in.');
        navigate('/login'); // Redirect to the home page or dashboard
      } else {
        const error = await response.json();
        console.error('OTP verification failed:', error);
        alert(`Verification failed: ${error.message || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('Verification error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (

  );
};

export default VerifyOtp; 