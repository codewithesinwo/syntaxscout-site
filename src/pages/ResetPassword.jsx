import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    console.log("Reset request for:", email);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000); // Hide success after 3 seconds
  };

  const isFormValid = email && validateEmail(email) && !error;

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-[url('/BackendDevelopment.webp')] bg-cover bg-center">
      <motion.div
        className="w-full max-w-4xl flex bg-white rounded-2xl shadow-2xl dark:bg-gray-800 overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Image Section */}
        <div
          className="hidden md:flex md:w-1/2 bg-cover bg-center"
          style={{ backgroundImage: "url('/forgotpassword.jpg')" }}
        ></div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 space-y-6">
          <div className="flex flex-col items-center">
            <div className="p-2 bg-blue-100 rounded-full dark:bg-blue-900/50">
              <img
                src="/public/Syntaxscout-logo.png"
                alt="Logo"
                className="w-20 h-20"
              />
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Forgot Password?
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Enter your email to receive a verification code.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                className={`w-full px-3 py-2 text-gray-900 bg-gray-100 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 ${
                  error
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-500 focus:ring-blue-500"
                }`}
                placeholder="Enter your email"
                aria-describedby={error ? "email-error" : undefined}
              />
              {error && (
                <p
                  id="email-error"
                  className="mt-1 text-xs text-red-500"
                  role="alert"
                >
                  {error}
                </p>
              )}
            </div>

            <div>
              <label
                className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Verification Code
              </label>
              <input
                type="text"
                className={`w-full px-3 py-2 text-gray-900 bg-gray-100 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2`}
                placeholder="Enter your verification code"
              />
            </div>

            <motion.button
              type="submit"
              disabled={!isFormValid}
              className="w-full px-4 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 dark:disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Verification Code
            </motion.button>

            {success && (
              <p className="text-sm text-center text-green-600 dark:text-green-400">
                Verification Code sent to your email!
              </p>
            )}
          </form>

          <div className="text-sm text-center">
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

