import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { BiSolidDashboard, BiSolidMessageAltDetail } from "react-icons/bi";
import { LuPanelRightOpen, LuPanelLeftOpen } from "react-icons/lu";
import { SiDiscourse } from "react-icons/si";
import { MdAssignmentAdd } from "react-icons/md";
import { IoSettings } from "react-icons/io5";





import {
  FaGoodreads,
  FaUserLock,
  FaBars,
} from "react-icons/fa";

{/* <LuPanelLeft />; */}

export default function DashboardSideShow() {
  const [isOpen, setIsOpen] = useState(true);

  const menu = [
    { to: "/dashboard", icon: BiSolidDashboard, label: "Dashboard" },
    { to: "/courses", icon: SiDiscourse, label: "All Courses" },
    { to: "/assignments", icon: MdAssignmentAdd, label: "Assignment" },
    { to: "/grades", icon: FaGoodreads, label: "Grades" },
    { to: "/messages", icon: BiSolidMessageAltDetail, label: "Messages" },
    {
      to: "/settings",
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
      className={`hidden md:flex h-screen bg-gray-800 text-white flex-col items-center py-6 shadow-lg ${
        isOpen ? "w-60" : "w-20"
      } duration-300`}
    >
      {/* Toggle Button */}
      <div
        className="text-2xl text-amber-300 cursor-pointer self-end mr-3 mt-15"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <LuPanelRightOpen /> : <LuPanelLeftOpen />}
      </div>

      {/* Logo */}
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`font-extrabold text-2xl mt-5 ${
          !isOpen && "hidden"
        } text-amber-50 tracking-wide`}
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
                    isActive
                      ? "bg-amber-300 text-gray-900"
                      : "text-gray-300 hover:bg-gray-700 hover:text-amber-300"
                  }`
                }
              >
                <Icon className="text-xl " />
                {isOpen && <span>{item.label}</span>}
              </NavLink>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
