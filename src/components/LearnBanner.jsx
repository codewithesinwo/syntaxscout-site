import React from "react";
import { motion } from "framer-motion";
import { Code, Users, Laptop, Globe } from "lucide-react";

const LearnBanner = () => {
  return (
    <section className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-20 px-6 md:px-20 mt-5">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Learn <span className="text-indigo-400">Coding Online</span> <br />{" "}
            from Anywhere 🌍
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Master web development, design, and emerging technologies through
            real-world projects and expert mentorship. Whether you want to learn
            or teach, this platform connects you with opportunities to grow,
            build, and inspire others in tech.
          </p>

          {/* <div className="flex flex-wrap gap-4">
            <button className="bg-indigo-500 hover:bg-indigo-600 px-6 py-3 rounded-xl font-semibold transition-all">
              Start Learning
            </button>
            <button className="border border-indigo-400 hover:bg-indigo-500/20 px-6 py-3 rounded-xl font-semibold transition-all">
              Become a Tutor
            </button>
          </div> */}
        </motion.div>

        {/* Right Side: Illustration or Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div className="bg-gray-800/70 p-10 rounded-3xl shadow-2xl border border-gray-700 w-[90%] md:w-[80%]">
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col items-center text-center">
                <Code className="w-10 h-10 text-indigo-400 mb-2" />
                <h4 className="font-semibold text-lg">Learn to Code</h4>
                <p className="text-gray-400 text-sm">
                  Interactive lessons built for beginners and pros.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <Laptop className="w-10 h-10 text-indigo-400 mb-2" />
                <h4 className="font-semibold text-lg">Build Projects</h4>
                <p className="text-gray-400 text-sm">
                  Work on real-world coding challenges and showcase your skills.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <Users className="w-10 h-10 text-indigo-400 mb-2" />
                <h4 className="font-semibold text-lg">Join a Community</h4>
                <p className="text-gray-400 text-sm">
                  Learn and grow with other passionate developers.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <Globe className="w-10 h-10 text-indigo-400 mb-2" />
                <h4 className="font-semibold text-lg">Teach Worldwide</h4>
                <p className="text-gray-400 text-sm">
                  Share your knowledge and teach coding to students across the
                  globe.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LearnBanner;
