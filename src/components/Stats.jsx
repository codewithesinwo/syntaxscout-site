import React from "react";
import { motion } from "framer-motion";

const stats = [
  { number: "10M+", label: "Students taught" },
  { number: "4M", label: "YouTube fans" },
  { number: "20+", label: "Years of experience" },
  { number: "52", label: "Coding courses" },
];

const Stats = () => {
  return (
    <section className="w-full bg-gray-900 text-white py-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-white">
          Our Impact in Numbers
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Millions of learners, years of expertise, and dozens of high-quality
          courses.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-6xl mx-auto">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center"
          >
            <span className="text-4xl md:text-5xl font-bold text-indigo-400 mb-2">
              {stat.number}
            </span>
            <p className="text-gray-300 text-lg text-center">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
