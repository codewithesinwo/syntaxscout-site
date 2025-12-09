import React from "react";
import { motion as Motion } from "framer-motion";

// simple localStorage hook used by this component
function useLocalStorage(key, initialValue) {
  const [state, setState] = React.useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });

  React.useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [key, state]);

  return [state, setState];
}

export default function Feedback({ id }) {
  // Format a Date object to numeric 'DD/MM/YYYY' (e.g. '17/10/2025')
  const formatSubmissionDate = (date = new Date()) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    feedback: "",
    rating: 5,
  });

  const [errors, setErrors] = React.useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  //  Preload feedback from the school
  const defaultFeedback = [
    {
      id: 1,
      name: "John Bassey",
      feedback:
        "As a beginner, I found the learning structure very accommodating and well-paced.",
      rating: 5,
      date: "12/06/2025",
    },
    {
      id: 2,
      name: "Kingsley Balogun",
      feedback:
        "I enrolled for the data analysis course and it was worth every moment.",
      rating: 5,
      date: "08/04/2025",
    },
    {
      id: 3,
      name: "Esther Nwachukwu",
      feedback:
        "Syntax Scout transformed my learning experience. The classes are well structured and interactive.",
      rating: 5,
      date: "24/08/2025",
    },
    {
      id: 4,
      name: "Emeka Mohammed",
      feedback:
        "As a beginner, I found the learning structure very accommodating and well-paced.",
      rating: 5,
      date: "08/08/2025",
    },
    {
      id: 5,
      name: "Divine Bassey",
      feedback:
        "I learned so much about modern tech tools at Syntax Scout. The instructors are top-notch.",
      rating: 4,
      date: "07/01/2025",
    },
    {
      id: 6,
      name: "Precious Mohammed",
      feedback:
        "Thanks to Syntax Scout, I can now build responsive websites confidently.",
      rating: 4,
      date: "05/03/2025",
    },
    {
      id: 7,
      name: "Tunde Oluwole",
      feedback:
        "The bootcamp improved my technical and problem-solving skills immensely.",
      rating: 4,
      date: "24/06/2025",
    },
    {
      id: 8,
      name: "Ezekiel Nnamdi",
      feedback:
        "The mentorship program at Syntax Scout gave me real-world project experience.",
      rating: 5,
      date: "17/12/2025",
    },
    {
      id: 9,
      name: "Esther Johnson",
      feedback:
        "I enrolled for the data analysis course and it was worth every moment.",
      rating: 4,
      date: "23/08/2025",
    },
    {
      id: 10,
      name: "Joy Okafor",
      feedback:
        "The mentorship program at Syntax Scout gave me real-world project experience.",
      rating: 4,
      date: "26/06/2025",
    },
    {
      id: 11,
      name: "Samuel Okafor",
      feedback:
        "Syntax Scout made me fall in love with coding. The environment is very encouraging.",
      rating: 5,
      date: "30/06/2025",
    },
    {
      id: 12,
      name: "Felix Ojo",
      feedback:
        "I enrolled for the data analysis course and it was worth every moment.",
      rating: 5,
      date: "15/11/2025",
    },
    {
      id: 13,
      name: "Miracle Nnamdi",
      feedback:
        "As a beginner, I found the learning structure very accommodating and well-paced.",
      rating: 4,
      date: "11/12/2025",
    },
    {
      id: 14,
      name: "Benjamin Mohammed",
      feedback:
        "The mentorship program at Syntax Scout gave me real-world project experience.",
      rating: 5,
      date: "21/11/2025",
    },
    {
      id: 15,
      name: "Felix Ogunleye",
      feedback:
        "Syntax Scout transformed my learning experience. The classes are well structured and interactive.",
      rating: 5,
      date: "24/01/2025",
    },
    {
      id: 16,
      name: "Esther Oluwole",
      feedback:
        "Syntax Scout transformed my learning experience. The classes are well structured and interactive.",
      rating: 5,
      date: "27/12/2025",
    },
    {
      id: 17,
      name: "Peter Onyeka",
      feedback:
        "I appreciate the patience and professionalism of the tutors at Syntax Scout.",
      rating: 4,
      date: "26/04/2025",
    },
    {
      id: 18,
      name: "Grace Ogunleye",
      feedback:
        "The mentorship program at Syntax Scout gave me real-world project experience.",
      rating: 4,
      date: "25/09/2025",
    },
    {
      id: 19,
      name: "Samuel Chukwu",
      feedback:
        "I appreciate the patience and professionalism of the tutors at Syntax Scout.",
      rating: 4,
      date: "16/01/2025",
    },
    {
      id: 20,
      name: "Michael Abiola",
      feedback:
        "The practical sessions helped me understand the concepts easily. Highly recommend Syntax Scout.",
      rating: 5,
      date: "22/10/2025",
    }
  ];

  const [feedbacks, setFeedbacks] = useLocalStorage("feedbacks", defaultFeedback);

  const handleRatingChange = (rating) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.feedback.trim())
      newErrors.feedback = "feedback is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newfeedback = {
        ...formData,
        id: Date.now(),
        // stamp the submission with the real date in 'DD Month YYYY' format
        date: formatSubmissionDate(),
      };
      setFeedbacks((prev) => [newfeedback, ...prev]); // Add new one at the top
      setFormData({ name: "", email: "", feedback: "", rating: 5 });
    }
  };

 
  const stars = [1, 2, 3, 4, 5];

  return (
    // allow id so this component can be targeted by hash links
    <section id={id} className="min-h-screen text-white py-12 px-6">
      <div className="max-w-4xl mx-auto mt-8">
  <Motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
        >
          Share Your feedback
  </Motion.h1>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <Motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-900/60 border border-gray-800 rounded-xl p-8 backdrop-blur-lg"
          >
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Submit Your Experience
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Rating
                </label>
                <div className="flex space-x-1">
                  {stars.map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingChange(star)}
                      className={`text-2xl transition ${
                        formData.rating >= star
                          ? "text-yellow-400"
                          : "text-gray-600"
                      } hover:text-yellow-400`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Feedback
                </label>
                <textarea
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none ${
                    errors.feedback ? "border-red-500" : ""
                  }`}
                  placeholder="Share your experience with Syntax Scout and our courses..."
                />
                {errors.feedback && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.feedback}
                  </p>
                )}
              </div>

              <Motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition"
              >
                Submit feedback
              </Motion.button>
            </form>
          </Motion.div>

          {/* Feedbacks Display */}
          <Motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-center mb-6">
              Recent Feedbacks
            </h2>
            {feedbacks.length === 0 ? (
              <p className="text-gray-400 text-center italic">
                No feedbacks yet. Be the first to share!
              </p>
            ) : (
              
              <div className="space-y-4 max-h-150 overflow-y-auto p-5">
                {feedbacks.map((feedback) => (
                  <Motion.div
                    key={feedback.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-900/60 border border-gray-800 rounded-lg p-6"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center">
                        <div className="flex space-x-1 mr-3">
                          {[...Array(feedback.rating)].map((_, i) => (
                            <span key={i} className="text-yellow-400">
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-sm text-gray-400">
                          {/* {feedback.date} */}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4">
                      {feedback.feedback}
                    </p>
                    <p className="font-semibold text-white">
                      - {feedback.name}
                    </p>
                  </Motion.div>
                ))}
              </div>
            )}
          </Motion.div>
        </div>
      </div>
    </section>
  );
}
