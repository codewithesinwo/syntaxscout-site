import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";


export default function SignUp() {
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);
    
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    fetch("http://localhost:8000/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }),
    })
      .then((res) =>
        res.json().then((data) => {
          return { ok: res.ok, data };
        })
      )
      .then(({ ok, data }) => {
        if (!ok) {
          setErrors({
            general: data.error || data.message || "Registration failed.",
          });
          throw new Error(data.error || data.message);
        }

        alert("Student registered successfully!");
        console.log("Saved student:", data);

        setSuccess(true);

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })

      .catch((err) => {
        console.error("Error:", err);
        setErrors({
          general: err.message || "Something went wrong. Try again.",
        });
      });
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  


  const isFormValid =
    formData.name &&
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    Object.values(errors).every((error) => !error);

  return (
    <div className="flex items-center justify-center p-4 bg-[url('/BackendDevelopment.webp')] bg-cover bg-center min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-2xl dark:bg-gray-800"
      >
        <div className="flex flex-col items-center">
          <div className="p-2 bg-blue-100 rounded-full dark:bg-blue-900/50">
            <img
              src="/public/GbyteTechnologiesLogo.png"
              alt="Logo"
              className="w-20 h-20"
            />
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Start learning — access courses, resources and community.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label
              htmlFor="name"
              className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 text-gray-900 bg-gray-100 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 ${
                errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-500 focus:ring-blue-500"
              }`}
              placeholder="Enter your name"
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <p
                id="name-error"
                className="mt-1 text-xs text-red-500"
                role="alert"
              >
                {errors.name}
              </p>
            )}
          </div>
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
              placeholder="Create a password"
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
          <div>
            <label
              htmlFor="confirmPassword"
              className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Confirm password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-3 py-2 text-gray-900 bg-gray-100 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 ${
                errors.confirmPassword
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-500 focus:ring-blue-500"
              }`}
              placeholder="Repeat your password"
              aria-describedby={
                errors.confirmPassword ? "confirmPassword-error" : undefined
              }
            />
            {errors.confirmPassword && (
              <p
                id="confirmPassword-error"
                className="mt-1 text-xs text-red-500"
                role="alert"
              >
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className="w-full px-4 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 dark:disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
          >
            Sign Up
          </button>

          {success && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-center text-green-600 dark:text-green-400"
            >
              Sign up successful!
            </motion.p>
          )}
          {errors.general && (
            <p className="text-sm text-center text-red-600 dark:text-red-400 mt-2">{errors.general}</p>
          )}
        </form>

        <div className="space-y-4">
          <div className="flex items-center text-xs text-gray-500 uppercase dark:text-gray-400">
            <span className="flex-grow border-t border-gray-300 dark:border-gray-600"></span>
            <span className="px-3">Or sign up with</span>
            <span className="flex-grow border-t border-gray-300 dark:border-gray-600"></span>
          </div>
          <div className="w-full">
            <a
              href="https://www.google.com"
              className="flex items-center justify-center p-3 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Sign up with Google"
            >
              <FaGoogle />
              {/* <h1 className="ml-2.5 text-2xl font-bold">Google</h1> */}
            </a>
          </div>
        </div>

        <div className="text-sm text-center">
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            Already have an account? Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
