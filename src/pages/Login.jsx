import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { setToken } from "../utils/localstorage";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  // const isAuthenticated = true;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email))
      newErrors.email = "Please enter a valid email address.";
    if (!formData.password || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters long.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    })
      .then((res) => {
        return res.json().then((data) => {
          return { ok: res.ok, data };
        });
      })
      .then(({ ok, data }) => {
        if (!ok) {
          setErrors({ general: data.message || "Invalid login details." });
          return;
        }

        const token = data?.data?.token;
        if (token) {
          setToken(token);
        }

        setSuccess(true);

        navigate("/dashboard", { replace: true, state: { token } });
      })

      .catch((err) => {
        console.error("Error:", err);
        setErrors({ general: "Something went wrong. Try again." });
      });
  };

  const isFormValid =
    formData.email &&
    formData.password &&
    Object.values(errors).every((error) => !error);

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-[url('/BackendDevelopment.webp')] bg-cover bg-center">
      <motion.div
        className="mt-20 mb-5 w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-2xl dark:bg-gray-800"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
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
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Log in to continue — access your courses and profile.
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
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 text-gray-900 bg-gray-100 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-500 focus:ring-blue-500"
              }`}
              placeholder="Enter your email"
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p
                id="email-error"
                className="mt-1 text-xs text-red-500"
                role="alert"
              >
                {errors.email}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 text-gray-900 bg-gray-100 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-500 focus:ring-blue-500"
              }`}
              placeholder="Enter your password"
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            {errors.password && (
              <p
                id="password-error"
                className="mt-1 text-xs text-red-500"
                role="alert"
              >
                {errors.password}
              </p>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={!isFormValid}
            className="w-full px-4 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 dark:disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Log In
          </motion.button>

          {success && (
            <p className="text-sm text-center text-green-600 dark:text-green-400">
              Login successful!
            </p>
          )}
        </form>

        <div className="text-sm text-center">
          <Link
            to="/reset-password"
            className="font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            Can't log in | Reset your password?
          </Link>
        </div>
        <div className="text-sm text-center">
          <Link
            to="/signup"
            className="font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            Don't have an account? Sign up
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

