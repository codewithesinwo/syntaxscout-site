import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { BiSolidDashboard, BiSolidMessageAltDetail } from "react-icons/bi";
import { LuPanelRightOpen, LuPanelLeftOpen } from "react-icons/lu";
import { SiDiscourse } from "react-icons/si";
import { MdAssignmentAdd } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import {
  FaGoodreads,
  FaUserLock,
  // FaBars,
} from "react-icons/fa";


export default function DashboardSideShow() {
  const [isOpen, setIsOpen] = useState(true);
  const { darkMode } = useTheme();

  const menu = [
    { to: "/dashboard", icon: BiSolidDashboard, label: "Dashboard" },
    { to: "/dashboard/courses", icon: SiDiscourse, label: "All Courses" },
    { to: "/dashboard/assignments", icon: MdAssignmentAdd, label: "Assignment" },
    { to: "/dashboard/grades", icon: FaGoodreads, label: "Grades" },
    { to: "/dashboard/messages", icon: BiSolidMessageAltDetail, label: "Messages" },
    {
      to: "/dashboard/settings",
      icon: IoSettings,
      label: "Settings",
    },
    { to: "/logout", icon: FaUserLock, label: "Log out" },
  ];

  return (
    <motion.div
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`hidden md:flex h-screen ${
        darkMode ? "bg-black border-r-2" : "bg-gray-200"
      } text-white flex-col items-center py-6 shadow-lg ${
        isOpen ? "w-60" : "w-20"
      } duration-300 transition-colors`}
    >
      {/* Toggle Button */}
      <div
        className={`${
          darkMode
            ? "text-4xl text-white cursor-pointer self-start ml-3 mt-15"
            : "text-4xl text-black cursor-pointer self-start ml-3 mt-15"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <LuPanelRightOpen /> : <LuPanelLeftOpen />}
      </div>

      {/* Logo */}
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`font-extrabold text-2xl mt-5 ${!isOpen && "hidden"} ${
          darkMode ? "text-white" : "text-gray-950"
        } tracking-wide`}
      >
        Dashboard
      </motion.h3>


      {/* Menu */}
      <div className="w-full px-3 mt-5 space-y-2 flex-none">
        {menu.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.to}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-4 p-3 rounded-md font-semibold transition-all duration-300 ${
                    isActive && darkMode
                      ? "bg-amber-300 text-black "
                      : isActive && !darkMode
                      ? "bg-amber-300 text-red-900 "
                      : !darkMode
                      ? "text-black  hover:bg-gray-500"
                      : "text-white  hover:bg-gray-500"
                  }`
                }
              >
                <Icon className="text-xl text-center " />
                {isOpen && <span>{item.label}</span>}
              </NavLink>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
