import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import {
  FaUser,
  FaBell,
  FaShieldAlt,
  FaCog,
  FaSave,
  FaTimes,
  FaCheck,
  FaExclamationTriangle,
  FaInfoCircle,
  FaSpinner,
} from "react-icons/fa";

export default function DashboardSetting() {
  const { darkMode } = useTheme();

  const [profileData, setProfileData] = useState({
    firstName: "Abasiubong",
    lastName: "User",
    email: "abasiubong@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Passionate learner interested in technology and programming.",
    avatar: null,
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    courseUpdates: true,
    assignmentReminders: true,
    forumActivity: false,
    marketingEmails: false,
    weeklyDigest: true,
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    showProgress: true,
    showAchievements: true,
    allowMessages: true,
    dataSharing: false,
  });

  const [accountSettings, setAccountSettings] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorAuth: false,
    language: "en",
    timezone: "UTC-5",
  });

  const [coursePurchaseData, setCoursePurchaseData] = useState({
    purchasedCourses: [
      {
        id: 1,
        title: "React Basics",
        price: 49.99,
        purchased: true,
        date: "2024-01-15",
      },
      {
        id: 2,
        title: "Advanced JavaScript",
        price: 79.99,
        purchased: true,
        date: "2024-02-20",
      },
    ],
    cartItems: [],
  });

  const [activeSection, setActiveSection] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [errors, setErrors] = useState({});

  const sections = [
    { id: "profile", label: "Profile Settings", icon: FaUser },
    { id: "notifications", label: "Notifications", icon: FaBell },
    { id: "privacy", label: "Privacy", icon: FaShieldAlt },
    { id: "account", label: "Account", icon: FaCog },
    { id: "course-purchase", label: "Courses Purchase", icon: FaCog },
  ];

  const validateProfile = () => {
    const newErrors = {};
    if (!profileData.firstName || !profileData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!profileData.lastName || !profileData.lastName.trim())
      newErrors.lastName = "Last name is required";
    if (!profileData.email || !profileData.email.trim())
      newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(profileData.email))
      newErrors.email = "Email is invalid";
    if (profileData.phone && !/^\+?[\d\s\-\(\)]+$/.test(profileData.phone))
      newErrors.phone = "Phone number is invalid";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateAccount = () => {
    const newErrors = {};
    if (accountSettings.newPassword && accountSettings.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }
    if (accountSettings.newPassword !== accountSettings.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (section) => {
    setLoading(true);
    setMessage({ type: "", text: "" });

    let isValid = true;
    if (section === "profile") isValid = validateProfile();
    else if (section === "account") isValid = validateAccount();

    if (!isValid) {
      setLoading(false);
      return;
    }

    setTimeout(() => {
      setLoading(false);
      setMessage({
        type: "success",
        text: `${
          section.charAt(0).toUpperCase() + section.slice(1)
        } settings saved successfully!`,
      });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }, 1500);
  };

  const handleCancel = (section) => {
    setMessage({ type: "", text: "" });
    setErrors({});
    // In a real app you'd restore from persisted state; keep as no-op for now
  };

  const Tooltip = ({ children, content }) => (
    <div className="relative group inline-flex">
      {children}
      <div
        className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 ${
          darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        {content}
        <div
          className={`absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 ${
            darkMode ? "bg-gray-700" : "bg-gray-100"
          }`}
        />
      </div>
    </div>
  );

  const renderToggle = (checked, onChange) => (
    <button
      type="button"
      role="switch"
      aria-checked={!!checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex items-center transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-amber-300 rounded-full ${
        checked ? "bg-amber-400" : "bg-gray-200"
      }`}
      style={{ width: 44, height: 24 }}
    >
      <span
        className={`absolute bg-white rounded-full shadow transform transition-transform`}
        style={{
          width: 20,
          height: 20,
          left: checked ? 20 : 2,
          top: 2,
        }}
        aria-hidden="true"
      />
    </button>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 mt-16 ${
        darkMode ? "bg-black text-white" : "bg-gray-100 text-gray-900"
      } min-h-screen`}
    >
      <div className="max-w-6xl mx-auto">
        <h1
          className={`text-3xl font-bold mb-8 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Settings
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div
              className={`rounded-lg shadow-md p-4 ${
                darkMode ? "bg-neutral-900" : "bg-white"
              }`}
            >
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 text-left ${
                        activeSection === section.id
                          ? "bg-amber-300 text-gray-900"
                          : darkMode
                          ? "text-white hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="text-lg" />
                      <span className="font-medium">{section.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={`rounded-lg shadow-md p-6 ${
                  darkMode ? "bg-neutral-900" : "bg-white"
                }`}
              >
                {activeSection === "profile" && (
                  <div>
                    <h2
                      className={`text-2xl font-semibold mb-6 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Profile Settings
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          First Name *
                        </label>
                        <input
                          type="text"
                          value={profileData.firstName}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              firstName: e.target.value,
                            })
                          }
                          className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 outline-none transition-colors ${
                            darkMode
                              ? "bg-neutral-800 border-gray-600 text-white"
                              : "bg-white border-gray-300 text-gray-900"
                          } ${errors.firstName ? "border-red-500" : ""}`}
                          aria-describedby={
                            errors.firstName ? "firstName-error" : undefined
                          }
                        />
                        {errors.firstName && (
                          <p
                            id="firstName-error"
                            className="text-red-500 text-xs mt-1"
                          >
                            {errors.firstName}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Last Name *
                        </label>
                        <input
                          type="text"
                          value={profileData.lastName}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              lastName: e.target.value,
                            })
                          }
                          className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 outline-none transition-colors ${
                            darkMode
                              ? "bg-neutral-800 border-gray-600 text-white"
                              : "bg-white border-gray-300 text-gray-900"
                          } ${errors.lastName ? "border-red-500" : ""}`}
                          aria-describedby={
                            errors.lastName ? "lastName-error" : undefined
                          }
                        />
                        {errors.lastName && (
                          <p
                            id="lastName-error"
                            className="text-red-500 text-xs mt-1"
                          >
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Email *
                        </label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              email: e.target.value,
                            })
                          }
                          className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 outline-none transition-colors ${
                            darkMode
                              ? "bg-neutral-800 border-gray-600 text-white"
                              : "bg-white border-gray-300 text-gray-900"
                          } ${errors.email ? "border-red-500" : ""}`}
                          aria-describedby={
                            errors.email ? "email-error" : undefined
                          }
                        />
                        {errors.email && (
                          <p
                            id="email-error"
                            className="text-red-500 text-xs mt-1"
                          >
                            {errors.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              phone: e.target.value,
                            })
                          }
                          className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 outline-none transition-colors ${
                            darkMode
                              ? "bg-neutral-800 border-gray-600 text-white"
                              : "bg-white border-gray-300 text-gray-900"
                          } ${errors.phone ? "border-red-500" : ""}`}
                          aria-describedby={
                            errors.phone ? "phone-error" : undefined
                          }
                        />
                        {errors.phone && (
                          <p
                            id="phone-error"
                            className="text-red-500 text-xs mt-1"
                          >
                            {errors.phone}
                          </p>
                        )}
                      </div>
                      <div className="md:col-span-2">
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Bio
                        </label>
                        <textarea
                          value={profileData.bio}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              bio: e.target.value,
                            })
                          }
                          rows={3}
                          className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 outline-none transition-colors resize-none ${
                            darkMode
                              ? "bg-neutral-800 border-gray-600 text-white"
                              : "bg-white border-gray-300 text-gray-900"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === "notifications" && (
                  <div>
                    <h2
                      className={`text-2xl font-semibold mb-6 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Notification Preferences
                    </h2>
                    <div className="space-y-4">
                      {Object.entries(notificationSettings).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center gap-3">
                              <label
                                className={`text-sm font-medium ${
                                  darkMode ? "text-gray-300" : "text-gray-700"
                                }`}
                              >
                                {key
                                  .replace(/([A-Z])/g, " $1")
                                  .replace(/^./, (str) => str.toUpperCase())}
                              </label>
                              <Tooltip
                                content={`Receive notifications for ${key
                                  .toLowerCase()
                                  .replace(/([A-Z])/g, " $1")}`}
                              >
                                <FaInfoCircle
                                  className={`text-sm ${
                                    darkMode ? "text-gray-400" : "text-gray-500"
                                  } cursor-help`}
                                />
                              </Tooltip>
                            </div>
                            <div>
                              {renderToggle(value, (next) =>
                                setNotificationSettings((s) => ({
                                  ...s,
                                  [key]: next,
                                }))
                              )}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {activeSection === "privacy" && (
                  <div>
                    <h2
                      className={`text-2xl font-semibold mb-6 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Privacy Settings
                    </h2>
                    <div className="space-y-6">
                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Profile Visibility
                        </label>
                        <select
                          value={privacySettings.profileVisibility}
                          onChange={(e) =>
                            setPrivacySettings({
                              ...privacySettings,
                              profileVisibility: e.target.value,
                            })
                          }
                          className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 outline-none transition-colors ${
                            darkMode
                              ? "bg-neutral-800 border-gray-600 text-white"
                              : "bg-white border-gray-300 text-gray-900"
                          }`}
                        >
                          <option value="public">Public</option>
                          <option value="friends">Friends Only</option>
                          <option value="private">Private</option>
                        </select>
                      </div>
                      {Object.entries(privacySettings)
                        .filter(([key]) => key !== "profileVisibility")
                        .map(([key, value]) => (
                          <div
                            key={key}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center gap-3">
                              <label
                                className={`text-sm font-medium ${
                                  darkMode ? "text-gray-300" : "text-gray-700"
                                }`}
                              >
                                {key
                                  .replace(/([A-Z])/g, " $1")
                                  .replace(/^./, (str) => str.toUpperCase())}
                              </label>
                              <Tooltip
                                content={`Control visibility of your ${key
                                  .toLowerCase()
                                  .replace(/([A-Z])/g, " $1")}`}
                              >
                                <FaInfoCircle
                                  className={`text-sm ${
                                    darkMode ? "text-gray-400" : "text-gray-500"
                                  } cursor-help`}
                                />
                              </Tooltip>
                            </div>
                            <div>
                              {renderToggle(value, (next) =>
                                setPrivacySettings((s) => ({
                                  ...s,
                                  [key]: next,
                                }))
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {activeSection === "account" && (
                  <div>
                    <h2
                      className={`text-2xl font-semibold mb-6 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Account Settings
                    </h2>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label
                            className={`block text-sm font-medium mb-2 ${
                              darkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            Language
                          </label>
                          <select
                            value={accountSettings.language}
                            onChange={(e) =>
                              setAccountSettings({
                                ...accountSettings,
                                language: e.target.value,
                              })
                            }
                            className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 outline-none transition-colors ${
                              darkMode
                                ? "bg-neutral-800 border-gray-600 text-white"
                                : "bg-white border-gray-300 text-gray-900"
                            }`}
                          >
                            <option value="en">English</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                            <option value="de">German</option>
                          </select>
                        </div>
                        <div>
                          <label
                            className={`block text-sm font-medium mb-2 ${
                              darkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            Timezone
                          </label>
                          <select
                            value={accountSettings.timezone}
                            onChange={(e) =>
                              setAccountSettings({
                                ...accountSettings,
                                timezone: e.target.value,
                              })
                            }
                            className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 outline-none transition-colors ${
                              darkMode
                                ? "bg-neutral-800 border-gray-600 text-white"
                                : "bg-white border-gray-300 text-gray-900"
                            }`}
                          >
                            <option value="UTC-8">Pacific Time (UTC-8)</option>
                            <option value="UTC-5">Eastern Time (UTC-5)</option>
                            <option value="UTC+0">GMT (UTC+0)</option>
                            <option value="UTC+1">
                              Central European Time (UTC+1)
                            </option>
                          </select>
                        </div>
                      </div>

                      <div className="border-t pt-6">
                        <h3
                          className={`text-lg font-medium mb-4 ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          Change Password
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <label
                              className={`block text-sm font-medium mb-2 ${
                                darkMode ? "text-gray-300" : "text-gray-700"
                              }`}
                            >
                              Current Password
                            </label>
                            <input
                              type="password"
                              value={accountSettings.currentPassword}
                              onChange={(e) =>
                                setAccountSettings({
                                  ...accountSettings,
                                  currentPassword: e.target.value,
                                })
                              }
                              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 outline-none transition-colors ${
                                darkMode
                                  ? "bg-neutral-800 border-gray-600 text-white"
                                  : "bg-white border-gray-300 text-gray-900"
                              }`}
                            />
                          </div>
                          <div>
                            <label
                              className={`block text-sm font-medium mb-2 ${
                                darkMode ? "text-gray-300" : "text-gray-700"
                              }`}
                            >
                              New Password
                            </label>
                            <input
                              type="password"
                              value={accountSettings.newPassword}
                              onChange={(e) =>
                                setAccountSettings({
                                  ...accountSettings,
                                  newPassword: e.target.value,
                                })
                              }
                              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 outline-none transition-colors ${
                                darkMode
                                  ? "bg-neutral-800 border-gray-600 text-white"
                                  : "bg-white border-gray-300 text-gray-900"
                              } ${errors.newPassword ? "border-red-500" : ""}`}
                              aria-describedby={
                                errors.newPassword
                                  ? "newPassword-error"
                                  : undefined
                              }
                            />
                            {errors.newPassword && (
                              <p
                                id="newPassword-error"
                                className="text-red-500 text-xs mt-1"
                              >
                                {errors.newPassword}
                              </p>
                            )}
                          </div>
                          <div>
                            <label
                              className={`block text-sm font-medium mb-2 ${
                                darkMode ? "text-gray-300" : "text-gray-700"
                              }`}
                            >
                              Confirm Password
                            </label>
                            <input
                              type="password"
                              value={accountSettings.confirmPassword}
                              onChange={(e) =>
                                setAccountSettings({
                                  ...accountSettings,
                                  confirmPassword: e.target.value,
                                })
                              }
                              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 outline-none transition-colors ${
                                darkMode
                                  ? "bg-neutral-800 border-gray-600 text-white"
                                  : "bg-white border-gray-300 text-gray-900"
                              } ${
                                errors.confirmPassword ? "border-red-500" : ""
                              }`}
                              aria-describedby={
                                errors.confirmPassword
                                  ? "confirmPassword-error"
                                  : undefined
                              }
                            />
                            {errors.confirmPassword && (
                              <p
                                id="confirmPassword-error"
                                className="text-red-500 text-xs mt-1"
                              >
                                {errors.confirmPassword}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <label
                            className={`text-sm font-medium ${
                              darkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            Enable Two-Factor Authentication
                          </label>
                          <Tooltip content="Add an extra layer of security to your account">
                            <FaInfoCircle
                              className={`text-sm ${
                                darkMode ? "text-gray-400" : "text-gray-500"
                              } cursor-help`}
                            />
                          </Tooltip>
                        </div>
                        <div>
                          {renderToggle(accountSettings.twoFactorAuth, (next) =>
                            setAccountSettings((s) => ({
                              ...s,
                              twoFactorAuth: next,
                            }))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === "course-purchase" && (
                  <div>
                    <h2
                      className={`text-2xl font-semibold mb-6 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Courses Purchase
                    </h2>
                    <div className="space-y-8">
                      {/* Purchased Courses Section */}
                      <div>
                        <h3
                          className={`text-lg font-semibold mb-4 ${
                            darkMode ? "text-gray-200" : "text-gray-800"
                          }`}
                        >
                          My Purchased Courses
                        </h3>
                        {coursePurchaseData.purchasedCourses.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {coursePurchaseData.purchasedCourses.map((course) => (
                              <div
                                key={course.id}
                                className={`p-4 rounded-lg border-2 border-green-500 ${
                                  darkMode ? "bg-neutral-800" : "bg-green-50"
                                }`}
                              >
                                <div className="flex items-start justify-between mb-2">
                                  <h4
                                    className={`font-semibold text-lg ${
                                      darkMode ? "text-white" : "text-gray-900"
                                    }`}
                                  >
                                    {course.title}
                                  </h4>
                                  <FaCheck className="text-green-500 text-xl" />
                                </div>
                                <p
                                  className={`text-sm mb-3 ${
                                    darkMode ? "text-gray-400" : "text-gray-600"
                                  }`}
                                >
                                  Purchased on: {course.date}
                                </p>
                                <button
                                  className={`w-full px-4 py-2 rounded-md font-medium transition-colors ${
                                    darkMode
                                      ? "bg-amber-500 text-black hover:bg-amber-600"
                                      : "bg-amber-400 text-gray-900 hover:bg-amber-500"
                                  }`}
                                >
                                  Continue Learning
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p
                            className={`text-center py-6 ${
                              darkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            No purchased courses yet.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCancel(activeSection)}
                    className={`flex items-center gap-2 px-6 py-2 rounded-md font-medium transition-colors ${
                      darkMode
                        ? "bg-gray-700 text-white hover:bg-gray-600"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                    disabled={loading}
                  >
                    <FaTimes />
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSave(activeSection)}
                    className={`flex items-center gap-2 px-6 py-2 rounded-md font-medium transition-colors ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-amber-400 text-black hover:bg-amber-500"
                    }`}
                    disabled={loading}
                  >
                    {loading ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      <FaSave />
                    )}
                    {loading ? "Saving..." : "Save Changes"}
                  </motion.button>
                </div>

                <AnimatePresence>
                  {message.text && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`mt-4 p-4 rounded-md flex items-center gap-3 ${
                        message.type === "success"
                          ? "bg-green-100 text-green-800 border border-green-200"
                          : "bg-red-100 text-red-800 border border-red-200"
                      }`}
                    >
                      {message.type === "success" ? (
                        <FaCheck />
                      ) : (
                        <FaExclamationTriangle />
                      )}
                      <span>{message.text}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
