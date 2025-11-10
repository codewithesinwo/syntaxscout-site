import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircle } from "react-icons/io";
import { NavLink, Link } from "react-router-dom";

const navLinks = [
  { name: "Courses", href: "/courses" },
  { name: "Leaning Paths", href: "/leaning-paths" },
  { name: "Lifetime Access", href: "/lifetime-access" },
  { name: "Forum", href: "/forum" },
  { name: "Contact", href: "/contact" },
];


export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white fixed w-full top-0 left-0 z-50 shadow-md">
      <nav className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center justify-center space-x-2">
            <img
              src="/GbyteTechnologiesLogo.png"
              alt="Logo"
              className="h-8 w-auto"
            />
            <span className="font-bold text-3x1">Syntax Scout</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex gap-8 text-sm font-semibold">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.href}
                className="hover:text-indigo-400 transition-colors duration-200"
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

          {/* Navigate to login page */}
          <div className="hidden lg:flex">
            <NavLink to="/login">
              <button className="border p-2 px-5 rounded-2xl cursor-pointer hover:bg-teal-300/70 font-bold transition-colors duration-900">
                Login
              </button>
            </NavLink>
          </div>

        {/* Hamburger (Mobile Only) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-gray-400 hover:text-white z-50"
        >
          {isOpen ? (
            <IoMdCloseCircle size={28} />
          ) : (
            <GiHamburgerMenu size={24} />
          )}
        </button>

        {/* Mobile Menu */}
        <div
          className={`fixed top-15 right-0 w-1/2 bg-gray-900 text-white flex flex-col items-center justify-center gap-5 text-lg font-semibold transition-transform duration-300 ease-in-out lg:hidden py-5 rounded-b-3xl ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              className="hover:text-indigo-400 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}

          <div>
            <button>Members </button>
          </div>

          {/* Navigate to login page */}
          <div>
            <NavLink to="/login">
              <button className="border p-2 px-5 rounded-2xl cursor-pointer hover:bg-teal-300/70 font-bold transition-colors duration-900">
                Login
              </button>
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}
