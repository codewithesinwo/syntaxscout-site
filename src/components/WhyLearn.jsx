import React from "react";
import { CheckCircle, BookOpen, Clock, Code, Globe, Users } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <BookOpen className="w-10 h-10 text-indigo-500 mb-3" />,
    title: "Perfectly Structured Courses",
    desc: "No more jumping between random YouTube tutorials. Follow a clear, logical path designed to build your skills step-by-step.",
  },
  {
    icon: <Clock className="w-10 h-10 text-indigo-500 mb-3" />,
    title: "Clear and Bite-Sized Lessons",
    desc: "Each lesson is focused and fluff-free, so you can make real progress—even with a busy schedule. Get exactly what you need without wasting a minute.",
  },
  {
    icon: <Code className="w-10 h-10 text-indigo-500 mb-3" />,
    title: "More than Just Code",
    desc: "I go beyond the 'what' and show you the 'why' and 'how' behind every concept, so you can code with real understanding.",
  },
  {
    icon: <CheckCircle className="w-10 h-10 text-indigo-500 mb-3" />,
    title: "Hands-on Projects You'll Love",
    desc: "We’ll build real-world projects together, giving you the confidence to tackle real challenges on the job.",
  },
  {
    icon: <Users className="w-10 h-10 text-indigo-500 mb-3" />,
    title: "Built on 20+ Years of Experience",
    desc: "With over two decades in the industry, I've seen it all. I'll share insights and lessons that you won't find in any textbook.",
  },
  {
    icon: <Globe className="w-10 h-10 text-indigo-500 mb-3" />,
    title: "Trusted by Millions",
    desc: "#1 ranked tutorials on YouTube, trusted by millions for their clarity and depth.",
  },
];

const WhyLearn = () => {
  return (
    <section className="w-full bg-gray-50 py-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Why You'll <span className="text-indigo-500">Love Learning Here</span>
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Quality, Structure, and Real Results — a clear path to master coding.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 hover:shadow-2xl transition"
          >
            <div className="flex flex-col items-start">
              {feature.icon}
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto mt-16 text-center">
        <h3 className="text-3xl font-bold mb-4 text-gray-900">
          Recognized by Professionals
        </h3>
        <p className="text-gray-600 text-lg mb-6">
          Trusted by employees at top companies like Microsoft, Amazon, and
          Google. My courses help professionals sharpen their skills and stay
          ahead in the tech industry.
        </p>
      </div>
    </section>
  );
};

export default WhyLearn;
