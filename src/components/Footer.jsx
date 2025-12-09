// import React, { useState } from "react";
import {
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {

  return (
    <footer>
      <div className="bg-gray-900 text-gray-300 py-4 md:flex justify-center items-center gap-20 ">
        <Link to="/">
          <div>
            <p className="font-bold flex justify-center items-center">
              &copy; Syntax Scout
            </p>
          </div>
        </Link>

        <div className="md:flex gap-5 justify-center items-center flex">
          <div className="border p-2 rounded-full hover:bg-red-600 transition-all cursor-pointer">
            <a href="https://youtube.com/codewithesinwo" target="_blank">
              <FaYoutube />
            </a>
          </div>
          <div className="border p-2 rounded-full hover:bg-blue-600 transition-all cursor-pointer">
            <a href="https://linkedin.com/codewithesinwo" target="_blank">
              <FaLinkedinIn />
            </a>
          </div>
          <div className="border p-2 rounded-full hover:bg-blue-900 transition-all cursor-pointer">
            <a href="https://facebook.com/codewithesinwo" target="_blank">
              <FaFacebookF />
            </a>
          </div>
          <div className="border p-2 rounded-full hover:bg-black transition-all cursor-pointer">
            <a href="https://x.com/codewithesinwo" target="_blank">
              <FaTwitter />
            </a>
          </div>
          <div className="border p-2 rounded-full hover:bg-red-700 transition-all cursor-pointer">
            <a href="https://instagram.com/codewithesinwo" target="_blank">
              <FaInstagram />
            </a>
          </div>
          <div className="border p-2 rounded-full hover:bg-black transition-all cursor-pointer">
            <a href="https://tiktok.com/codewithesinwo" target="_blank">
              <FaTiktok />
            </a>
          </div>
        </div>

        <div className="flex gap-5.5 justify-center items-center">
          <p>Terms os Use</p>
          <p>Privacy Policy</p>
        </div>
      </div>
    </footer>
  );
}
