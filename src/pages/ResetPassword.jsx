import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const [generatedCode, setGeneratedCode] = useState(null);

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [step, setStep] = useState(1);

  const [timer, setTimer] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSendCode = () => {
    if (!email || !validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setGeneratedCode(null);

    setSuccess(`Verification code sent to ${email}`);
    setError("");

    setTimer(30 * 60);
    setStep(2);
  };

  useEffect(() => {
    if (timer <= 0) return;

    const countdown = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(countdown);
  }, [timer]);

  const formatTime = (t) => {
    const m = parseInt(t / 60);
    const s = parseInt(t % 60);
    return `${m}:${s < 10 ? "0" + s : s}`;
  };

  const handleVerifyCode = () => {
    if (timer <= 0) {
      setError("Verification code expired. Please resend.");
      return;
    }

    if (!verificationCode.trim()) {
      setError("Please enter a verification code.");
      return;
    }

    setError("");
    setSuccess("Code verified successfully!");
    setStep(3);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (!newPassword || !confirmNewPassword) {
      setError("Please fill out both password fields.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSuccess("Password reset successfully!");
    setError("");

    setEmail("");
    setVerificationCode("");
    setNewPassword("");
    setConfirmNewPassword("");
    setStep(1);
    setTimer(0);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 pt-20 bg-gray-100 dark:bg-gray-900">
      <motion.div
        className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center mb-6">
          <img
            src="/public/Syntaxscout-logo.png"
            alt="Logo"
            className="w-24 h-24"
          />
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Reset Password
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          {step === 1 && "Enter your email to receive a verification code."}
          {step === 2 && "Enter the verification code sent to your email."}
          {step === 3 && "Create your new password."}
        </p>

        {(error || success) && (
          <div
            className={`p-3 text-center text-sm rounded-lg mb-4 ${
              error ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
            }`}
          >
            {error || success}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full px-3 py-3 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              onClick={handleSendCode}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
            >
              Send Verification Code
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <p className="text-center text-blue-500 font-medium">
              Code expires in: <b>{formatTime(timer)}</b>
            </p>

            <div>
              <label className="block mb-1 text-sm font-medium">
                Verification Code
              </label>
              <input
                type="text"
                className="w-full px-3 py-3 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white"
                placeholder="Enter code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </div>

            <button
              onClick={handleVerifyCode}
              className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
            >
              Verify Code
            </button>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium">
                New Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-3 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-3 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white"
                placeholder="Confirm password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
            >
              Reset Password
            </button>
          </form>
        )}

        <p className="text-center text-sm mt-4">
          <Link
            to="/login"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Back to Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
