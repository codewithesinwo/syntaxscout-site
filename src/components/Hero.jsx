import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center text-center px-6 py-24 overflow-hidden bg-gray-950 text-white">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 flex flex-col lg:flex-row items-center justify-between gap-20 w-full max-w-7xl text-justify"
      >
        {/* Text Section */}
        <div className="flex-1 text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-6xl font-bold mb-6 leading-tight"
          >
            Empowering the Future of{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Web Innovation
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 text-lg mb-10 text-justify"
          >
            Syntax Scout is a forward-thinking hub for developers, designers,
            and tech enthusiasts. We build and share sleek, reusable UI
            components, modern frameworks, and tools that power the next
            generation of digital experiences. Code smarter, build faster, and
            deploy with confidence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4 flex-wrap justify-center lg:justify-start"
          >
            <Link
              to="/signup"
              className=" bg-blue-700 py-3 px-8 rounded-e-2xl block text-lg text-white hover:underline text-center"
              // className="bg-gray-800 px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-500 transition"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-4"
              >
                Sign up for free
                <FaArrowRight />
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* Animated Code */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="border-4 border-transparent p-4 multicolor-border"
          // className="flex-1 bg-gray-900/60 border border-gray-800 rounded-xl p-6 text-left shadow-xl backdrop-blur-lg w-full"
          // className="flex-1 bg-gray-900/60 border border-gray-800 rounded-xl p-6 text-left shadow-xl backdrop-blur-lg w-full"
        >
          <div className="flex gap-3 mb-2 border-b-2 ">
            <div className="h-4 w-4 bg-red-600 rounded-full mb-2"></div>
            <div className="h-4 w-4 bg-yellow-300 rounded-full mb-2"></div>
            <div className="h-4 w-4 bg-white rounded-full mb-2"></div>
          </div>

          <div className="text-xs text-gray-500 my-5">App.jsx</div>
          <pre className="text-left text-lg leading-relaxed">
            <code>
              <span className="text-indigo-400">import</span> React{" "}
              <span className="text-indigo-400">from</span> 'react';{"\n"}
              <span className="text-indigo-400">import</span> Button{" "}
              <span className="text-indigo-400">from</span>{" "}
              './components/Button';{"\n\n"}
              <span className="text-green-400">function</span> App() {"{"}
              {"\n"}
              {"  "}return ({"\n"}
              {"    "}&lt;<span className="text-purple-400">div</span>{" "}
              className="app"&gt;{"\n"}
              {"      "}&lt;<span className="text-purple-400">h1</span>
              &gt;Welcome to Syntax Scout&lt;/
              <span className="text-purple-400">h1</span>&gt;{"\n"}
              {"      "}&lt;<span className="text-pink-400">Button</span>{" "}
              text="Click Me" /&gt;{"\n"}
              {"    "}&lt;/<span className="text-purple-400">div</span>&gt;
              {"\n"}
              {"  "});{"\n"}
              {"}"}
              {"\n\n"}
              <span className="text-indigo-400">export default</span> App;
            </code>
          </pre>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
