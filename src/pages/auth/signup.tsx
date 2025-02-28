import { AuthForm } from "../../components/AuthForm";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
export function SignupPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [email, setemail] = useState("");
  const [cndit, setcndit] = useState(false);
  const handleVerify = async () => {
    try {
      const response = await fetch(
        "https://api.malaysiabdmartshop.com/api/auth/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, otp }), // Include email if needed
        }
      );

      if (response.ok) {
        alert("OTP verified successfully! Please log in now");
        navigate("/auth/login"); // Redirect to the home page or dashboard
      } else {
        const error = await response.json();
        console.error("OTP verification failed:", error);
        alert(`Verification failed: ${error.message || "Please try again."}`);
      }
    } catch (error) {
      console.error("Verification error:", error);
      alert("An error occurred. Please try again later.");
    }
  };
  const handleSubmit = async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
  }) => {
    try {
      const response = await fetch(
        "https://api.malaysiabdmartshop.com/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        // Assuming the API sends an OTP to the user's email/phone
        alert("Signup successful! Please check your email/phone for the OTP.");
        setcndit(true);
      } else {
        const error = await response.json();
        console.error("Signup failed:", error);
        alert(`Signup failed: ${error.message || "Please try again."}`);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      {cndit ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md w-full space-y-8">
            <div>
              <h2 className="text-center text-3xl font-bold text-gray-800 dark:text-gray-200">
                Verify OTP
              </h2>
              <p className="mt-2 text-center text-gray-600 dark:text-gray-300">
                Please enter the OTP sent to your email/phone
              </p>
            </div>
            <div className="mt-8 space-y-6">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md 
                   placeholder-gray-500 text-gray-900 dark:bg-gray-700 dark:text-gray-100
                   focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button
                onClick={handleVerify}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent 
                   text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Verify OTP
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md w-full space-y-8">
            <div>
              <h2 className="text-center text-3xl font-bold text-gray-800 dark:text-gray-200">
                Create Account
              </h2>
              <p className="mt-2 text-center text-gray-600 dark:text-gray-300">
                Sign up for a new account
              </p>
            </div>

            <AuthForm
              isLogin={false}
              onSubmit={handleSubmit}
              setemail={setemail}
              onToggleMode={() => navigate("/auth/login")}
            />
          </div>
        </div>
      )}
    </div>
  );
}
