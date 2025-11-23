import React, { useState } from "react";
import Logo from "../assets/Syntaxscout-logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircle } from "react-icons/io";
import { NavLink, Link } from "react-router-dom";
import { FaSearch, FaFilter, FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "All Courses", href: "/courses" },
  { name: "Assignment", href: "/assignments" },
  { name: "Grades", href: "/grades" },
  { name: "Messages", href: "/messages" },
  { name: "Settings", href: "/settings" },
  { name: "Log out", href: "/logout" },
];

export default function DashboardHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`flex justify-evenly items-center ${
        darkMode ? "bg-black text-white border-b-2" : "bg-gray-100 text-white"
      } shadow-md px-6 py-3 fixed w-full top-0 left-0 z-40 transition-colors duration-300`}
    >
      <Link to="/">
        <div className="flex items-center gap-2">
          <img src={Logo} alt="Logo" className="h-8 w-auto" />
          <span className={`${darkMode ? "font-bold text-xl text-gray-100 hidden md:inline" : "font-bold text-xl text-gray-900 hidden md:inline"}`}>
            Syntax Scout
          </span>
        </div>
      </Link>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <FaSearch
            className={`absolute left-3 top-1/2 -translate-y-1/2 ${
              darkMode ? "text-gray-100" : "text-gray-50"
            }`}
          />
          <input
            type="text"
            placeholder="Search courses..."
            className={`pl-9 pr-3 py-2 rounded-lg border ${
              darkMode
                ? "bg-neutral-800 border-2 border-gray-100 text-gray-100"
                : "bg-white border-gray-900 text-gray-800"
            } focus:ring-2 focus:ring-amber-500 outline-none w-64 transition-colors duration-300`}
          />
        </div>

        <div className="relative">
          <FaFilter
            className={`absolute left-3 top-1/2 -translate-y-1/2 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          />
          <select
            className={`pl-9 pr-3 py-2 rounded-lg border ${
              darkMode
                ? "bg-neutral-800 border-2 border-gray-100 text-gray-100"
                : "bg-white border-gray-300 text-gray-800"
            } focus:ring-2 focus:ring-amber-500 outline-none w-40 appearance-none transition-colors duration-300`}
          >
            <option>All levels</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>

        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-lg ${
            darkMode
              ? "text-amber-400 hover:bg-gray-800 border"
              : "text-gray-600 hover:bg-amber-200 border"
          } transition-colors duration-300`}
        >
          {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
      </div>

      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-gray-700 text-2xl"
      >
        {isOpen ? <IoMdCloseCircle /> : <GiHamburgerMenu />}
      </button>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 right-3 bg-gray-900 text-white rounded-b-2xl p-5 flex flex-col items-start gap-3 shadow-lg md:hidden"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                className="hover:text-amber-400 transition-all"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
