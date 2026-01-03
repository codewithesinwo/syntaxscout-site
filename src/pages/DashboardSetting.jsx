import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaBell,
  FaCog,
  FaSave,
  FaTimes,
  FaCheck,
  FaExclamationTriangle,
  FaSpinner,
  FaCreditCard,
  FaDownload,
  FaFileExport,
  FaTrashAlt,
} from "react-icons/fa";

export default function DashboardSetting() {
  const [activeSection, setActiveSection] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "success" });

  /* ===================== STATES ===================== */

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: "",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    courseUpdates: true,
  });

  const [academic, setAcademic] = useState({
    language: "English",
    gradeView: "percentage",
    attendanceAlerts: true,
  });

  const [account, setAccount] = useState({
    twoFactorEnabled: false,
  });

  const [accessibility, setAccessibility] = useState({
    largeText: false,
    highContrast: false,
    reduceMotion: false,
  });

  const [subscription] = useState({
    plan: "School Premium",
    status: "Active",
    nextBillingDate: "2026-02-01",
    nextBillingAmount: 14.99,
  });

  const devices = [
    { id: 1, name: "Chrome on Windows", location: "Lagos, NG", active: true },
    { id: 2, name: "Mobile App", location: "Abuja, NG", active: false },
  ];

  /* ===================== SIDEBAR ===================== */

  const sections = [
    { id: "profile", label: "Profile", icon: FaUser },
    { id: "notifications", label: "Notifications", icon: FaBell },
    { id: "academic", label: "Academic Preferences", icon: FaCog },
    { id: "account", label: "Account Security", icon: FaCog },
    { id: "devices", label: "Devices & Sessions", icon: FaCog },
    { id: "accessibility", label: "Accessibility", icon: FaCog },
    { id: "subscription", label: "Subscription", icon: FaCreditCard },
    { id: "data", label: "Data & Privacy", icon: FaFileExport },
  ];

  const editableSections = [
    "profile",
    "notifications",
    "academic",
    "account",
    "accessibility",
  ];

  /* ===================== HELPERS ===================== */

  function renderToggle(value, onChange) {
    return (
      <button
        onClick={() => onChange(!value)}
        className={`h-8 w-14 rounded-full flex items-center p-1 transition ${
          value ? "bg-teal-600 justify-end" : "bg-gray-300 justify-start"
        }`}
      >
        <span className="h-6 w-6 bg-white rounded-full shadow" />
      </button>
    );
  }

  function SectionCard({ title, subtitle, children }) {
    return (
      <section className="mb-6">
        <h3 className="text-xl font-semibold">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        <div className="mt-4 p-5 bg-white border rounded-lg">{children}</div>
      </section>
    );
  }

  function handleSave(section) {
    setLoading(true);
    setMessage({ text: "", type: "success" });

    setTimeout(() => {
      setLoading(false);
      setMessage({ text: `${section} saved successfully`, type: "success" });
      setTimeout(() => setMessage({ text: "", type: "success" }), 2500);
    }, 800);
  }

  function handleCancel() {
    setMessage({ text: "Changes discarded", type: "success" });
    setTimeout(() => setMessage({ text: "", type: "success" }), 2000);
  }

  /* ===================== RENDER ===================== */

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 mt-16 min-h-screen bg-gray-100"
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">School Dashboard Settings</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* SIDEBAR */}
          <aside>
            <div className="bg-white rounded-xl shadow p-4">
              {sections.map((s) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveSection(s.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-md mb-1 ${
                      activeSection === s.id
                        ? "bg-teal-600 text-black font-semibold"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <Icon />
                    {s.label}
                  </button>
                );
              })}
            </div>
          </aside>

          {/* CONTENT */}
          <main className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-xl shadow p-6"
              >
                {/* PROFILE */}
                {activeSection === "profile" && (
                  <SectionCard title="Profile">
                    <input
                      placeholder="Full name"
                      className="w-full mb-3 px-4 py-2 border rounded"
                      value={profile.name}
                      onChange={(e) =>
                        setProfile({ ...profile, name: e.target.value })
                      }
                    />
                    <input
                      placeholder="Email"
                      className="w-full mb-3 px-4 py-2 border rounded"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                      }
                    />
                    <textarea
                      placeholder="Bio"
                      rows={3}
                      className="w-full px-4 py-2 border rounded"
                      value={profile.bio}
                      onChange={(e) =>
                        setProfile({ ...profile, bio: e.target.value })
                      }
                    />
                  </SectionCard>
                )}

                {/* NOTIFICATIONS */}
                {activeSection === "notifications" && (
                  <SectionCard title="Notifications">
                    {Object.entries(notifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between mb-3">
                        <span className="capitalize">{key}</span>
                        {renderToggle(value, (v) =>
                          setNotifications({
                            ...notifications,
                            [key]: v,
                          })
                        )}
                      </div>
                    ))}
                  </SectionCard>
                )}

                {/* ACADEMIC */}
                {activeSection === "academic" && (
                  <SectionCard title="Academic Preferences">
                    <select
                      className="w-full mb-3 px-4 py-2 border rounded"
                      value={academic.language}
                      onChange={(e) =>
                        setAcademic({ ...academic, language: e.target.value })
                      }
                    >
                      <option>English</option>
                      <option>French</option>
                      <option>Spanish</option>
                    </select>

                    <select
                      className="w-full mb-3 px-4 py-2 border rounded"
                      value={academic.gradeView}
                      onChange={(e) =>
                        setAcademic({ ...academic, gradeView: e.target.value })
                      }
                    >
                      <option value="percentage">Percentage</option>
                      <option value="letter">Letter Grade</option>
                    </select>

                    <div className="flex justify-between">
                      <span>Attendance Alerts</span>
                      {renderToggle(academic.attendanceAlerts, (v) =>
                        setAcademic({ ...academic, attendanceAlerts: v })
                      )}
                    </div>
                  </SectionCard>
                )}

                {/* ACCOUNT */}
                {activeSection === "account" && (
                  <SectionCard title="Account Security">
                    <div className="flex justify-between">
                      <span>Two-Factor Authentication</span>
                      {renderToggle(account.twoFactorEnabled, (v) =>
                        setAccount({ twoFactorEnabled: v })
                      )}
                    </div>
                  </SectionCard>
                )}

                {/* DEVICES */}
                {activeSection === "devices" && (
                  <SectionCard title="Devices & Sessions">
                    {devices.map((d) => (
                      <div key={d.id} className="flex justify-between mb-3">
                        <div>
                          <div className="font-medium">{d.name}</div>
                          <div className="text-sm text-gray-500">
                            {d.location}
                          </div>
                        </div>
                        {d.active ? (
                          <span className="text-teal-600">Current</span>
                        ) : (
                          <button className="text-red-500 text-sm">
                            Sign out
                          </button>
                        )}
                      </div>
                    ))}
                  </SectionCard>
                )}

                {/* ACCESSIBILITY */}
                {activeSection === "accessibility" && (
                  <SectionCard title="Accessibility">
                    {Object.entries(accessibility).map(([k, v]) => (
                      <div key={k} className="flex justify-between mb-3">
                        <span className="capitalize">{k}</span>
                        {renderToggle(v, (val) =>
                          setAccessibility({
                            ...accessibility,
                            [k]: val,
                          })
                        )}
                      </div>
                    ))}
                  </SectionCard>
                )}

                {/* SUBSCRIPTION */}
                {activeSection === "subscription" && (
                  <SectionCard title="Subscription">
                    <p className="font-semibold">{subscription.plan}</p>
                    <p>Status: {subscription.status}</p>
                    <p>Next Billing: ${subscription.nextBillingAmount}</p>
                  </SectionCard>
                )}

                {/* DATA */}
                {activeSection === "data" && (
                  <SectionCard title="Data & Privacy">
                    <button className="w-full mb-3 p-3 border rounded flex justify-between">
                      Export My Data <FaDownload />
                    </button>
                    <button className="w-full p-3 border border-red-500 text-red-600 rounded flex justify-between">
                      Delete Account <FaTrashAlt />
                    </button>
                  </SectionCard>
                )}

                {/* ACTIONS */}
                {editableSections.includes(activeSection) && (
                  <div className="flex justify-end gap-3 mt-6 border-t pt-4">
                    <button
                      onClick={handleCancel}
                      className="px-5 py-2 bg-gray-200 rounded"
                    >
                      <FaTimes /> Cancel
                    </button>
                    <button
                      onClick={() => handleSave(activeSection)}
                      disabled={loading}
                      className="px-5 py-2 bg-teal-600 rounded flex items-center gap-2"
                    >
                      {loading ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <FaSave />
                      )}
                      Save
                    </button>
                  </div>
                )}

                {/* MESSAGE */}
                {message.text && (
                  <div className="mt-4 p-3 bg-teal-100 text-teal-800 rounded flex gap-2">
                    <FaCheck /> {message.text}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </motion.div>
  );
}
