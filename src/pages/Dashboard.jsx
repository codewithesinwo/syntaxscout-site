import React from "react";
import { motion } from "framer-motion";
import {
  // FaPlayCircle,
  FaCheckCircle,
  FaCalendarPlus,
  FaStar,
  FaBookOpen,
  FaAward,
  FaRobot,
  FaCloud,
  FaLock,
  FaCode,
  FaNetworkWired,
  FaLaptopCode,
  FaGlobe,
  FaChalkboardTeacher,
  FaCertificate,
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

export default function Dashboard() {
  const courses = [
    {
      id: 1,
      title: "Web Development Fundamentals",
      lessons: 15,
      level: "Beginner",
      progress: 60,
      gradient: "from-gray-900 to-blue-500",
    },
    {
      id: 2,
      title: "React & Frontend Development",
      lessons: 22,
      level: "Intermediate",
      progress: 45,
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      id: 3,
      title: "Python for Data Analysis",
      lessons: 18,
      level: "Beginner",
      progress: 80,
      gradient: "from-yellow-600 to-orange-500",
    },
    {
      id: 4,
      title: "Machine Learning with Python",
      lessons: 25,
      level: "Intermediate",
      progress: 35,
      gradient: "from-green-600 to-emerald-500",
    },
    {
      id: 5,
      title: "Cybersecurity & Ethical Hacking",
      lessons: 19,
      level: "Advanced",
      progress: 15,
      gradient: "from-red-600 to-orange-400",
    },
  ];

  const activities = [
    {
      icon: <FaCheckCircle className="text-green-500" />,
      text: 'Completed "Props vs State" in React',
      time: "2h ago",
    },
    {
      icon: <FaCalendarPlus className="text-indigo-500" />,
      text: 'Joined "Advanced CSS" live session',
      time: "1d ago",
    },
    {
      icon: <FaStar className="text-yellow-500" />,
      text: 'Rated "JavaScript Fundamentals" 5 stars',
      time: "1d ago",
    },
    {
      icon: <FaBookOpen className="text-blue-500" />,
      text: 'Started "Databases & SQL" course',
      time: "2d ago",
    },
    {
      icon: <FaAward className="text-orange-500" />,
      text: 'Earned "JS Basics" certificate',
      time: "3d ago",
    },
  ];

  const categories = [
    { icon: <FaLaptopCode />, title: "Web Development" },
    { icon: <FaRobot />, title: "AI & Machine Learning" },
    { icon: <FaCloud />, title: "Cloud Computing" },
    { icon: <FaLock />, title: "Cybersecurity" },
    { icon: <FaNetworkWired />, title: "Networking" },
    { icon: <FaGlobe />, title: "Digital Marketing" },
    { icon: <FaCode />, title: "Programming Languages" },
    { icon: <FaChalkboardTeacher />, title: "Tech Tutorials" },
  ];

  const recommended = [
    {
      title: "Mastering TypeScript",
      level: "Intermediate",
      gradient: "from-blue-600 to-indigo-500",
    },
    {
      title: "Artificial Intelligence Bootcamp",
      level: "Advanced",
      gradient: "from-purple-600 to-fuchsia-500",
    },
    {
      title: "Cloud Infrastructure with AWS",
      level: "Intermediate",
      gradient: "from-orange-600 to-yellow-500",
    },
  ];

  const news = [
    {
      title: "AI Revolutionizes Software Testing",
      source: "TechCrunch",
      time: "3h ago",
    },
    {
      title: "Microsoft Launches New Azure AI Tools",
      source: "The Verge",
      time: "6h ago",
    },
    {
      title: "Open Source is the Future of DevOps",
      source: "Dev.to",
      time: "1d ago",
    },
  ];

  const achievements = [
    { title: "Frontend Mastery", icon: <FaCertificate />, date: "Aug 2025" },
    { title: "Python Pro Badge", icon: <FaCertificate />, date: "Sep 2025" },
    { title: "UI/UX Designer", icon: <FaCertificate />, date: "Oct 2025" },
  ];

  const events = [
    {
      title: "Web Dev Bootcamp Live",
      date: "Nov 20, 2025",
      time: "10:00 AM",
      location: "Online",
    },
    {
      title: "AI in Business Summit",
      date: "Dec 05, 2025",
      time: "3:00 PM",
      location: "Google Meet",
    },
  ];

      const { darkMode } = useTheme();
  

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`${
        darkMode ? "bg-black text-gray-950" : "bg-gray-100 text-gray-900"
      } p-8 mt-15 transition-colors duration-300`}
    >
      {/* HEADER */}
      <div className="mb-8">
        <h1
          className={`${
            darkMode
              ? "text-3xl font-bold text-gray-100"
              : "text-3xl font-bold text-gray-900"
          }`}
        >
          Hello, Abasiubong! 👋
        </h1>
        <p className={`${darkMode ? "text-gray-100" : "text-gray-900"}`}>
          Welcome back! Ready to learn something new today?
        </p>
      </div>

      {/* CATEGORIES */}
      <h2
        className={`${
          darkMode
            ? "text-2xl font-semibold mb-4 text-gray-100"
            : "text-2xl font-semibold mb-4 text-gray-900"
        }`}
      >
        Top Categories
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-10">
        {categories.map((cat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className={`${
              darkMode ? "bg-neutral-950 border-neutral-700" : "bg-white"
            }shadow-md border rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer`}
          >
            <div
              className={`${
                darkMode ? "text-2xl text-white" : "text-2xl text-gray-950"
              }`}
            >
              {cat.icon}
            </div>
            <p
              className={`${
                darkMode
                  ? "text-sm font-medium text-center text-white"
                  : "text-sm font-medium text-center text-gray-950"
              }`}
            >
              {cat.title}
            </p>
          </motion.div>
        ))}
      </div>

      {/* COURSES */}
      <h2
        className={`${
          darkMode
            ? "text-2xl font-semibold mb-4 text-white"
            : "text-2xl font-semibold mb-4"
        }`}
      >
        Your Courses
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
        {courses.map((course, i) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.03 }}
            className={`${
              darkMode ? "bg-neutral-950 border-neutral-700" : "bg-white border"
            } p-5 rounded-2xl shadow-md `}
          >
            <div className="flex items-start gap-4 overflow-hidden">
              {/* <div
                className={`w-14 h-14 bg-gradient-to-br ${course.gradient} rounded-xl flex items-center justify-center text-white font-bold`}
              >
                {course.title.slice(0, 2).toUpperCase()}
              </div> */}

              <div>
                <h3 className={`${darkMode ? "font-semibold text-white" : ""}`}>
                  {course.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {course.lessons} lessons • {course.level}
                </p>
              </div>
            </div>

            <div className="mt-4 overflow-hidden">
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div
                  className={`h-2 bg-gradient-to-r ${course.gradient} rounded-full`}
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>

              <div className="flex justify-between text-xs text-gray-600 mt-2">
                <span>Progress: {course.progress}%</span>
                <button className="bg-gray-800 text-white px-3 py-1 rounded-md text-xs hover:bg-gray-700 cursor-pointer">
                  Continue
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* RECOMMENDED */}
      <h2
        className={`${
          darkMode
            ? "text-2xl font-semibold mb-4 text-white"
            : "text-2xl font-semibold mb-4"
        }`}
      >
        Recommended for You
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {recommended.map((rec, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className={`${
              darkMode
                ? "bg-neutral-950 text-white p-5 rounded-2xl shadow-md"
                : `bg-gradient-to-br ${rec.gradient} text-white p-5 rounded-2xl shadow-md`
            }`}
          >
            <h3 className="font-semibold text-lg">{rec.title}</h3>
            <p className="text-sm opacity-90 mb-3">{rec.level}</p>
            <button className="bg-white text-black font-medium px-4 py-2 rounded-md cursor-pointer">
              Enroll Now
            </button>
          </motion.div>
        ))}
      </div>

      {/* NEWS + EVENTS + ACHIEVEMENTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* NEWS */}
        <div
          className={`${
            darkMode
              ? "bg-neutral-950 text-white p-5 rounded-2xl shadow-md"
              : "bg-white p-5 rounded-2xl shadow-md border border-gray-200"
          }`}
        >
          <h2 className="font-bold text-xl mb-3">Tech News</h2>
          <ul className="space-y-3">
            {news.map((n, i) => (
              <li key={i}>
                <p className="text-sm font-medium">{n.title}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {n.source} • {n.time}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* EVENTS */}
        <div
          className={`${
            darkMode
              ? "bg-neutral-950 text-white p-5 rounded-2xl shadow-md"
              : "bg-white p-5 rounded-2xl shadow-md border border-gray-200"
          }`}
        >
          <h2 className="font-bold text-xl mb-3">Upcoming Events</h2>
          {events.map((event, i) => (
            <div
              key={i}
              className="border-b border-gray-100 py-3 last:border-none"
            >
              <p className={`${darkMode ? "font-semibold text-white" : "font-semibold text-gray-800"}`}>{event.title}</p>
              <p className="text-xs text-gray-500">
                {event.date} • {event.time}
              </p>
              <p className="text-xs text-gray-500">{event.location}</p>
            </div>
          ))}
        </div>

        {/* ACHIEVEMENTS */}
        <div
          className={`${
            darkMode
              ? "bg-neutral-950 text-white p-5 rounded-2xl shadow-md"
              : "bg-white p-5 rounded-2xl shadow-md border border-gray-200"
          }`}
        >
          <h2 className="font-bold text-xl mb-3">Achievements</h2>
          <div className="space-y-3">
            {achievements.map((a, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="text-yellow-500 text-xl">{a.icon}</div>
                <div>
                  <p className="text-sm font-medium">{a.title}</p>
                  <p className="text-xs text-gray-500">{a.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ACTIVITY */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`${
          darkMode
            ? "bg-neutral-950 text-white p-5 rounded-2xl shadow-md"
            : "bg-white p-5 rounded-2xl shadow-md border border-gray-200"
        }`}
      >
        
        <h2 className="font-bold text-xl mb-3">Recent Activity</h2>
        <ul className="space-y-3">
          {activities.map((act, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3"
            >
              {act.icon}
              <div>
                <p className="text-sm font-medium">{act.text}</p>
                <p className="text-xs text-gray-500">{act.time}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}

