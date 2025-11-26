import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function Courses({ limit }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("None");

  const courses = [
    {
      id: 1,
      title: "Web Development Fundamentals",
      description:
        "Learn HTML, CSS, and JavaScript to build responsive websites from scratch.",
      instructor: "John Doe",
      duration: 8,
      price: 89,
      category: "Web Dev",
      image:
        "/public/WebDevlopmentFundamentalImage.avif",
    },
    {
      id: 2,
      title: "React & Frontend Development",
      description:
        "Master React and Tailwind CSS to create powerful modern web apps.",
      instructor: "Sarah Johnson",
      duration: 10,
      price: 119,
      category: "Web Dev",
      image:
        "/public/ReactandFrontendDevelopment.avif",
    },
    {
      id: 3,
      title: "Python for Data Analysis",
      description:
        "Analyze and visualize data using Pandas, NumPy, and Matplotlib.",
      instructor: "Emma Brown",
      duration: 10,
      price: 139,
      category: "Data",
      image:
        "/public/PythonfordataAnal.webp",
    },
    {
      id: 4,
      title: "Machine Learning with Python",
      description:
        "Train predictive models and understand key algorithms using TensorFlow.",
      instructor: "Michael Green",
      duration: 14,
      price: 179,
      category: "Data",
      image:
        "/public/MachineLanguagePython.avif",
    },
    {
      id: 5,
      title: "Cybersecurity & Ethical Hacking",
      description:
        "Learn to protect systems, detect vulnerabilities, and perform penetration testing.",
      instructor: "James Carter",
      duration: 12,
      price: 189,
      category: "Security",
      image:
        "/public/CyberSecurityImage.jfif",
    },
    {
      id: 6,
      title: "Cloud Computing with AWS",
      description:
        "Get hands-on with AWS to deploy and manage scalable applications.",
      instructor: "Laura Kim",
      duration: 10,
      price: 169,
      category: "Cloud",
      image:
        "/public/CloudComputing.jfif",
    },
    {
      id: 7,
      title: "Networking & IT Infrastructure",
      description:
        "Understand routing, switching, and network security for modern infrastructures.",
      instructor: "Robert Allen",
      duration: 9,
      price: 99,
      category: "Security",
      image:
        "/public/NetworkingandIT.jfif",
    },
    {
      id: 8,
      title: "UI/UX Design Principles",
      description:
        "Design intuitive and beautiful interfaces using Figma and modern design systems.",
      instructor: "Sophia Martinez",
      duration: 6,
      price: 109,
      category: "Design",
      image:
        "/public/UIandUX.jpg",
    },
    {
      id: 9,
      title: "Graphic Design Professional Course",
      description:
        "Become a professional graphic designer using Adobe Photoshop, Illustrator, and CorelDRAW.",
      instructor: "David Williams",
      duration: 8,
      price: 129,
      category: "Design",
      image:
        "/public/GraphicDesign.jfif",
    },
    {
      id: 10,
      title: "Backend Development Course",
      description:
        "Master Node.js, Express, and databases to build secure backend APIs.",
      instructor: "Grace Miller",
      duration: 12,
      price: 149,
      category: "Web Dev",
      image:
        "/public/BackendDevelopment.webp",
    },
    {
      id: 11,
      title: "Fullstack Development Course",
      description:
        "Learn frontend and backend integration using React, Node.js, and MongoDB.",
      instructor: "Chris Johnson",
      duration: 14,
      price: 199,
      category: "Web Dev",
      image:
        "/public/FullStack.jfif",
    },
    {
      id: 12,
      title: "Desktop Publishing Course",
      description:
        "Learn document layout, typesetting, and page design with industry tools.",
      instructor: "Angela Roberts",
      duration: 6,
      price: 79,
      category: "Design",
      image:
        "/public/DesktopPublisher.jpg",
    },
 
    {
      id: 14,
      title: "Office Application Course",
      description:
        "Master Microsoft Word, Excel, PowerPoint, and Outlook for productivity.",
      instructor: "Lisa White",
      duration: 5,
      price: 59,
      category: "Business",
      image:
        "/public/OfficeApplication.jfif",
    },
    {
      id: 15,
      title: "AutoCAD Course",
      description:
        "Learn 2D and 3D modeling for architectural and mechanical designs using AutoCAD.",
      instructor: "Daniel Evans",
      duration: 10,
      price: 139,
      category: "Engineering",
      image:
        "/public/autocad.jfif",
    },
    {
      id: 16,
      title: "Digital Marketing Course",
      description:
        "Learn SEO, social media marketing, and ad campaigns for business growth.",
      instructor: "Olivia Lee",
      duration: 8,
      price: 119,
      category: "Business",
      image:
        "/public/digitalmarketing.jpg",
    },
    {
      id: 17,
      title: "Business Electronics Course",
      description:
        "Understand computer hardware, maintenance, and business tech systems.",
      instructor: "Henry Adams",
      duration: 9,
      price: 129,
      category: "Business",
      image:
        "/public/bussinesssCourse.jpg",
    },
  ];

  const categories = [
    // "All",
    // "Web Dev",
    // "Data",
    // "Security",
    // "Cloud",
    // "Design",
    // "Business",
    // "Engineering",
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      selectedCategory === "All" || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortOption === "priceAsc") return a.price - b.price;
    if (sortOption === "priceDesc") return b.price - a.price;
    if (sortOption === "durationAsc") return a.duration - b.duration;
    if (sortOption === "durationDesc") return b.duration - a.duration;
    return 0;
  });

  // If a numeric `limit` prop is provided, only show that many courses
  const visibleCourses =
    typeof limit === "number" ? sortedCourses.slice(0, limit) : sortedCourses;

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, y: 30 },
  };

  return (
    <div className="container mx-auto px-4  mt-20 ">
      {/* Title */}
      <motion.h1
        className="text-4xl font-bold text-center mb-8 text-black"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Explore Our Computer & Tech Courses
      </motion.h1>

      {/* Search and Sort */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 ">
        <motion.input
          type="text"
          placeholder="Search for a course (e.g. React, Cybersecurity, AutoCAD...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-white w-full sm:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition"
          whileFocus={{ scale: 1.02 }}
        />

        {/* <motion.select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="bg-white w-full sm:w-56 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition"
          whileFocus={{ scale: 1.02 }}
        >
          <option value="None">Sort by</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="durationAsc">Duration: Short to Long</option>
          <option value="durationDesc">Duration: Long to Short</option>
        </motion.select> */}
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-10 relative">
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
              selectedCategory === category
                ? "text-white bg-indigo-600"
                : "text-gray-700 bg-gray-200 hover:bg-indigo-100"
            }`}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Course Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence>
          {visibleCourses.length > 0 ? (
            visibleCourses.map((course) => (
              <motion.div
                key={course.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.4 }}
                layout
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition"
              >
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover transition-transform duration-300"
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {course.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Instructor:</span>{" "}
                    {course.instructor}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Duration:</span>{" "}
                    {course.duration} weeks
                  </p>
                  <p className="text-lg font-bold text-gray-900 mt-2">
                    ${course.price}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full mt-4 bg-gray-900 hover:bg-indigo-700 text-white py-2 rounded-md font-medium transition"
                  >
                    Enroll Now
                  </motion.button>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="col-span-full text-center text-black">
              No courses found.
            </p>
          )}
        </AnimatePresence>
      </motion.div>
      {/* Show "See all" link when the list is limited */}
      {typeof limit === "number" && sortedCourses.length > limit && (
        <div className="mt-8 text-center">
          <Link
            to="/courses"
            className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            See all courses
          </Link>
        </div>
      )}
    </div>
  );
}

