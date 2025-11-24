import React from 'react'
import Courses from '../components/Courses'
import { useTheme } from '../context/ThemeContext'

export default function DashboardCourses() {
  const { darkMode } = useTheme()


  const courses = [
    {
      id: 1,
      title: "The Ultimate Interview Preparation Bundle",
      desc: "Ace your interview: Master essential skills to impress employers and land your dream job",
      price: "NGN 97,832",
      oldPrice: "NGN 575,484",
      duration: "35h",
      image: "/your-image.png",
    },
    {
      id: 2,
      title: "Full-Stack Web Development Mastery",
      desc: "Learn HTML, CSS, JavaScript, React, Node.js, MongoDB and become a job-ready developer",
      price: "NGN 120,500",
      oldPrice: "NGN 390,000",
      duration: "52h",
      image: "/fullstack.png",
    },
    {
      id: 3,
      title: "Beginner UI/UX Design Bootcamp",
      desc: "Master Figma, wireframing, design systems, and build a strong design portfolio",
      price: "NGN 68,200",
      oldPrice: "NGN 210,000",
      duration: "29h",
      image: "/uiux.png",
    },
    {
      id: 4,
      title: "Python Programming Zero to Hero",
      desc: "Learn Python from basics to advanced: scripting, automation, APIs, OOP, projects",
      price: "NGN 45,000",
      oldPrice: "NGN 150,000",
      duration: "41h",
      image: "/python.png",
    },

    // ✅ NEW CODING COURSES
    {
      id: 5,
      title: "JavaScript Complete Guide 2025",
      desc: "Master ES6+, asynchronous JS, API handling, performance optimization, and modern frameworks",
      price: "NGN 75,900",
      oldPrice: "NGN 250,000",
      duration: "38h",
      image: "/javascript.png",
    },
    {
      id: 6,
      title: "React & Next.js Pro Bootcamp",
      desc: "Learn React hooks, Next.js architecture, API routes, server components, and deployment",
      price: "NGN 89,000",
      oldPrice: "NGN 300,000",
      duration: "48h",
      image: "/react-nextjs.png",
    },
    {
      id: 7,
      title: "Backend Engineering with Node.js",
      desc: "Learn REST APIs, databases, authentication, security, caching, and scalable backend systems",
      price: "NGN 110,000",
      oldPrice: "NGN 350,000",
      duration: "57h",
      image: "/node-backend.png",
    },
    {
      id: 8,
      title: "Mobile App Development with React Native",
      desc: "Build iOS & Android apps with React Native, Expo, navigation, and real-world projects",
      price: "NGN 95,300",
      oldPrice: "NGN 290,000",
      duration: "44h",
      image: "/react-native.png",
    },
    {
      id: 9,
      title: "Data Structures & Algorithms Mastery",
      desc: "Learn DSA with JavaScript: arrays, graphs, trees, recursion, dynamic programming",
      price: "NGN 82,400",
      oldPrice: "NGN 260,000",
      duration: "42h",
      image: "/dsa.png",
    },
    {
      id: 10,
      title: "Cybersecurity Fundamentals",
      desc: "Learn ethical hacking, network security, penetration testing, and threat analysis",
      price: "NGN 135,000",
      oldPrice: "NGN 420,000",
      duration: "36h",
      image: "/cybersecurity.png",
    },

    {
      id: 11,
      title: "HTML & CSS Zero to Mastery",
      desc: "Learn structure, styling, Flexbox, Grid, and responsive layouts to build modern websites",
      price: "NGN 56,000",
      oldPrice: "NGN 180,000",
      duration: "27h",
      image: "/html-css.png",
    },

    {
      id: 12,
      title: "Modern JavaScript (ES6+) Masterclass",
      desc: "Master JS fundamentals, DOM manipulation, async/await, fetch API, and real world projects",
      price: "NGN 78,500",
      oldPrice: "NGN 245,000",
      duration: "39h",
      image: "/modern-js.png",
    },

    {
      id: 13,
      title: "React, Vue & Angular Frontend Bootcamp",
      desc: "Learn the 3 major frontend frameworks, component systems, and state management like Redux",
      price: "NGN 135,000",
      oldPrice: "NGN 420,000",
      duration: "62h",
      image: "/frontend-frameworks.png",
    },

    {
      id: 14,
      title: "Frontend Tools & Workflow Mastery",
      desc: "Master Sass, developer tools, debugging, Webpack, Vite, and production optimization skills",
      price: "NGN 44,900",
      oldPrice: "NGN 160,000",
      duration: "28h",
      image: "/frontend-tools.png",
    },

    {
      id: 15,
      title: "Node.js Backend Development",
      desc: "Build scalable APIs with Node.js, Express, authentication, databases, and real projects",
      price: "NGN 110,500",
      oldPrice: "NGN 350,000",
      duration: "50h",
      image: "/nodejs.png",
    },

    {
      id: 16,
      title: "Python Backend with Django & Flask",
      desc: "Learn Django and Flask for backend development, APIs, authentication, admin dashboards",
      price: "NGN 105,000",
      oldPrice: "NGN 330,000",
      duration: "47h",
      image: "/python-django-flask.png",
    },

    {
      id: 17,
      title: "Ruby on Rails Full Stack Bootcamp",
      desc: "Build full-stack applications with Rails MVC, ActiveRecord, generators, and deployment",
      price: "NGN 92,800",
      oldPrice: "NGN 290,000",
      duration: "34h",
      image: "/rails.png",
    },

    {
      id: 18,
      title: "Java Spring Boot Developer Course",
      desc: "Build enterprise-grade backend systems using Java Spring Boot, MySQL, and REST APIs",
      price: "NGN 130,000",
      oldPrice: "NGN 400,000",
      duration: "55h",
      image: "/spring-boot.png",
    },

    {
      id: 19,
      title: "PHP & Laravel Developer Program",
      desc: "Learn PHP fundamentals, Laravel framework, routing, Blade templates, and full apps",
      price: "NGN 70,000",
      oldPrice: "NGN 230,000",
      duration: "32h",
      image: "/php-laravel.png",
    },
  ];


  return (
    <>
      <div
        className={`p-6 mt-15 py-10 ${darkMode ? 'bg-black' : 'bg-gray-100'} min-h-screen`
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-[#0D0D0D] p-4 rounded-xl w-full border border-[#1a1a1a] shadow-lg "
            >
              <div className="rounded-lg overflow-hidden bg-black">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-40 object-cover"
                />
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-white text-lg font-semibold leading-tight">
                    {course.title}
                  </h3>

                  <span className="text-sm bg-[#2A2A2A] text-white px-3 py-1 rounded-md">
                    {course.duration}
                  </span>
                </div>

                <p className="text-gray-400 text-sm mt-2 leading-snug">
                  {course.desc}
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <span className="text-white font-bold text-lg">
                    {course.price}
                  </span>

                  <span className="text-gray-500 line-through text-sm">
                    {course.oldPrice}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
