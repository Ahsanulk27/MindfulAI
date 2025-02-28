import { AuthForm } from '../../components/AuthForm';
import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";
export function LoginPage() {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const handleSubmit = async (data: { email: string; password: string }) => {
    try {
      const response = await fetch('https://api.malaysiabdmartshop.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const { token } = await response.json();
        // Store the token in local storage
        localStorage.setItem('token', token);
        
        // Redirect to the desired page after successful login
        navigate('/'); // Change this to the route you want to redirect to
      } else {
        const error = await response.json();
        console.error('Login failed:', error);
        alert(`Login failed: ${error.message || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-800 dark:text-gray-200">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-gray-600 dark:text-gray-300">
            Sign in to your account
          </p>
        </div>

        <AuthForm
          isLogin={true}
          setemail={setemail}
          onSubmit={handleSubmit}
          onToggleMode={() => navigate('/auth/signup')}
        />
      </div>
    </div>
  );
} 