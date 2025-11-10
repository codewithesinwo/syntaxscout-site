import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Linda Adewale", // Nigeria
    content:
      "Syntax Scout courses transformed how I approach coding. The lessons are clear, practical, and perfect for real-world projects.",
    stars: 5,
  },
  {
    name: "Aisha Bello", // Nigeria
    content:
      "I finally feel confident building web apps thanks to Syntax Scout structured and engaging lessons. Highly recommend!",
    stars: 5,
  },
  {
    name: "Li Wei", // China
    content:
      "Syntax Scout teaching style is very structured and detailed. I learned so much about full-stack development in a short time.",
    stars: 5,
  },
  {
    name: "Yuki Tanaka", // Japan
    content:
      "The lessons are easy to follow and practical. Thanks to Syntax Scout, I completed my first web application project.",
    stars: 5,
  },
  {
    name: "Rohan Kapoor", // India
    content:
      "Syntax Scout provides clear guidance and explains concepts thoroughly. I now feel confident applying coding skills professionally.",
    stars: 5,
  },
  {
    name: "Fatima Al-Hassan", // Arab region
    content:
      "Learning with Syntax Scout has been incredibly rewarding. Every lesson is focused on real-world results.",
    stars: 5,
  },
  {
    name: "Chinedu Okafor", // Nigeria
    content:
      "Syntax Scout made learning coding fun and straightforward. The community support helped me stay motivated throughout.",
    stars: 5,
  },
  {
    name: "Mei Ling", // China
    content:
      "Thanks to Syntax Scout, I finally understood complex topics like React hooks and Node.js integration. Excellent instructor!",
    stars: 5,
  },
  {
    name: "Hiroshi Yamamoto", // Japan
    content:
      "The lessons are engaging and clear. I was able to build a portfolio project in weeks thanks to Syntax Scout guidance.",
    stars: 5,
  },
  {
    name: "Sara Khan", // India
    content:
      "Syntax Scout provides actionable knowledge that I could immediately apply to freelance projects. Truly practical learning.",
    stars: 5,
  },
];


const faqs = [
  {
    question: "What’s included with Lifetime Access?",
    answer:
      "With Lifetime Access, you get immediate access to all current courses and all future releases—forever. Pay once, and you’ll never need to pay again.",
  },
  {
    question:
      "What's the difference between a single course and Lifetime Access?",
    answer:
      "Buying a single course gives you lifetime access to just that course. Lifetime Access unlocks everything ever created—and everything released in the future—with a single payment.",
  },
  {
    question: "Is there a money-back guarantee?",
    answer:
      "Yes! You can contact us within 30 days of purchase for a full refund—no questions asked.",
  },
  {
    question: "Can I download the courses?",
    answer: "Yes, all videos and resources can be downloaded to learn offline.",
  },
  {
    question: "Do I receive certificates for completed courses?",
    answer:
      "Yes, each completed course comes with a certificate of completion.",
  },
  {
    question: "How often are new courses added?",
    answer:
      "Typically 3–4 high-quality courses per year. Lifetime Access users receive all future courses at no extra cost.",
  },
  {
    question: "Is this suitable for beginners?",
    answer:
      "Absolutely! Courses guide you step-by-step, whether you're a beginner or want to deepen your knowledge.",
  },
];

const LifetimeAccess = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  return (
    <section className="w-full bg-gray-200 py-20 px-6 md:px-20">
      {/* Pricing Section */}
      <div className="max-w-6xl mx-auto text-center mb-16 mt-5">
        <h2 className="text-4xl font-bold mb-4 text-gray-900">
          One Payment. <span className="text-indigo-500">Lifetime Access</span>
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
          Pay once. Get lifetime access to 50+ coding courses designed to make
          you a real-world developer. No subscriptions. No recurring charges.
        </p>
        <div className="text-3xl font-bold text-indigo-600 mb-2">
          NGN 572,986
        </div>
        <p className="text-gray-500 mb-6">You'll be charged $399 + tax</p>
        <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold transition-all">
          Unlock All Courses
        </button>
      </div>

      {/* Included Features */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 mb-16">
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-gray-900">
            What's included:
          </h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>50+ premium courses worth $4,850+</li>
            <li>All future courses included 🌟</li>
            <li>330 hours of HD video</li>
            <li>Lifetime access</li>
            <li>Downloadable content</li>
            <li>Early access to new courses</li>
            <li>Help shape future course topics</li>
          </ul>
        </div>
        <div className="bg-gray-100 p-6 rounded-3xl shadow-lg">
          <h4 className="text-xl font-semibold mb-4 text-gray-900">
            Try It, Risk-Free
          </h4>
          <p className="text-gray-600 mb-4">
            I’m confident you’ll love the courses. But if it’s not the right
            fit, get a refund within 30 days—no questions asked.
          </p>
          <span className="text-indigo-500 font-bold">
            Money-back guarantee
          </span>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-6xl mx-auto mb-16">
        <h3 className="text-3xl font-bold mb-8 text-center text-gray-900">
          Real Results, Real Stories
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-3xl shadow-lg border border-gray-200"
            >
              <div className="flex items-center mb-2">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">"{t.content}"</p>
              <p className="font-semibold text-gray-900">— {t.name}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold mb-8 text-center text-gray-900">
          Frequently Asked Questions
        </h3>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                className="w-full text-left px-6 py-4 bg-gray-100 hover:bg-gray-200 flex justify-between items-center font-semibold text-gray-900"
              >
                {faq.question}
                <span className="text-gray-500">
                  {openFAQ === index ? "−" : "+"}
                </span>
              </button>
              {openFAQ === index && (
                <div className="px-6 py-4 text-gray-700 bg-white">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LifetimeAccess;
