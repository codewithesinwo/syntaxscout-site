import React from "react";

const GYBTE_KEY = "feedbacks_local";

export default function useFeedbacks(defaultValue) {
  const [feedbacks, setFeedbacks] = React.useState(() => {
    try {
      const saved = localStorage.getItem(GYBTE_KEY);
      return saved ? JSON.parse(saved) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  React.useEffect(() => {
    try {
      localStorage.setItem(GYBTE_KEY, JSON.stringify(feedbacks));
    } catch {
      // Ignore write errors
    }
  }, [feedbacks]);

  return [feedbacks, setFeedbacks];
}
