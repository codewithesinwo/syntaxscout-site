import React, { useState } from "react";

const ContactForm = ({ id }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState({ loading: false, success: "", error: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: "", error: "" });

    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ loading: false, error: "Please fill in all required fields.", success: "" });
      return;
    }

    if (!validateEmail(formData.email)) {
      setStatus({ loading: false, error: "Please enter a valid email address.", success: "" });
      return;
    }

    try {
      // Simulate API submission (replace this with your backend endpoint)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setStatus({ loading: false, success: "Your message has been sent successfully!", error: "" });
      setFormData({ name: "", email: "", phone: "", subject: "General Inquiry", message: "" });
    } catch {
      setStatus({ loading: false, error: "Something went wrong. Please try again later.", success: "" });
    }
  };

  return (
    // accept optional id so the section can be targeted via hash
    <div
      id={id}
      className="flex justify-center items-center bg-gray-950 min-h-screen p-4"
    >
      <section className="bg-gray-900/10 rounded-2xl shadow-lg p-8 w-full max-w-2xl mx-auto my-25 border border-gray-100">
        <h2 className="text-3xl font-semibold text-gray-100 mb-6 text-center">
          Contact Us
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-gray-100 font-medium mb-2">
              Full Name <span className="text-yellow-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 text-white outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-100 font-medium mb-2">
              Email Address <span className="text-yellow-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 text-white outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-100 font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 text-white outline-none"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-gray-100 font-medium mb-2">
              Message <span className="text-yellow-500">*</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              rows="5"
              maxLength="1000"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 text-white outline-none"
            ></textarea>
            <p className="text-sm text-gray-500 mt-1">
              {formData.message.length}/1000 characters
            </p>
          </div>

          {/* Status Messages */}
          {status.error && (
            <p className="text-red-600 font-medium">{status.error}</p>
          )}
          {status.success && (
            <p className="text-green-600 font-medium">{status.success}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status.loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 flex justify-center items-center"
          >
            {status.loading ? (
              <span className="animate-pulse">Sending...</span>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </section>
    </div>
  );
};

export default ContactForm;
