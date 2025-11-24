import React from 'react'
import { motion } from 'framer-motion'

export default function Path() {
  // Define the learning steps with images and short "what this is about" descriptions
  const steps = [
    {
      id: 1,
      title: 'Beginner Foundation',
      about: 'Build solid core skills before moving into advanced topics.',
      bullets: ['Introduction to the Web', 'HTML Basics', 'CSS Fundamentals', 'TailwindCSS Essentials', 'Basic JavaScript'],
      image: ""    
    },
    {
      id: 2,
      title: 'Frontend Development',
      about: 'Build modern and responsive interfaces.',
      bullets: ['Advanced TailwindCSS', 'Responsive Design', 'JavaScript DOM & Events', 'Git & GitHub Basics', 'Intro to React'],
      image: ""    
    },
    {
      id: 3,
      title: 'React Mastery',
      about: 'Build scalable and production-ready applications.',
      bullets: ['React Components', 'Hooks & State Management', 'Routing & Navigation', 'API Requests (REST)', 'Project Structure & Best Practices'],
      image: ""    
    },
    {
      id: 4,
      title: 'Backend & APIs',
      about: 'Understand server-side logic and data handling.',
      bullets: ['Node.js Fundamentals', 'Express.js Framework', 'Building REST APIs', 'Databases (MongoDB or PostgreSQL)', 'Authentication & Authorization'],
      image: ""    
    },
    {
      id: 5,
      title: 'Full-Stack Projects',
      about: 'Apply your skills in real-world projects.',
      bullets: ['Authentication System', 'Dashboard UI', 'Blog or CMS', 'E-Commerce Mini App'],
      image: ""    
    },
    {
      id: 6,
      title: 'Deployment & DevOps Basics',
      about: 'Learn how to launch and maintain your applications.',
      bullets: ['Netlify / Vercel Deployment', 'GitHub Actions Intro', 'Environment Variables'],
      image: ""    
    },
    {
      id: 7,
      title: 'Career & Growth',
      about: 'Prepare for real-world opportunities.',
      bullets: ['Writing a Tech Resume', 'Building a GitHub Portfolio', 'Interview Preparation'],
      image: ""   
     }
  ]

  const container = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06 } }
  }
  const card = {
    hidden: { opacity: 0, y: 10, scale: 0.995 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.38, ease: 'easeOut' } },
    hover: { scale: 1.02, boxShadow: '0 10px 30px rgba(2,6,23,0.12)' }
  }

  return (
    <>
      <section className="bg-gradient-to-b from-white to-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Learning Path
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              A practical, step-by-step curriculum designed to take you from fundamentals to production-ready engineering.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.12 }}
            variants={container}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {steps.map(step => (
              <motion.article
                key={step.id}
                variants={card}
                whileHover="hover"
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg focus-within:ring-2 focus-within:ring-blue-200 transition-transform"
                tabIndex={0}
                role="group"
                aria-labelledby={`step-${step.id}`}
              >

                <div className="relative h-40 md:h-44 lg:h-40">
                  <img
                    src={step.image}
                    alt={`${step.title} illustration`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>

                  <div className="absolute left-4 bottom-[-18px] md:bottom-[-22px]">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-white text-blue-600 font-semibold shadow-md border border-gray-200">
                      {step.id}
                    </div>
                  </div>
                </div>

                <div className="pt-8 px-6 pb-6">
                  <h3 id={`step-${step.id}`} className="text-lg font-semibold text-gray-900">
                    {step.title.replace(/^\d+\.\s*/, '')}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">{step.about}</p>

                  <ul className="mt-4 text-sm text-gray-700 list-disc list-inside space-y-1">
                    {step.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-0.5 text-gray-400">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-xs text-gray-500">Stage {step.id}</span>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      aria-label={`Explore ${step.title}`}
                    >
                      View
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}
