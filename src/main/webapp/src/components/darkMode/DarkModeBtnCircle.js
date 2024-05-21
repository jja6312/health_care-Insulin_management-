import React, { useState, useEffect } from "react";

const DarkModeBtnCircle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className={`w-20 h-20 rounded-full ${
        isDarkMode ? "bg-gray-800" : "bg-gray-200"
      } flex items-center justify-center`}
    >
      {isDarkMode ? (
        <span className="text-white text-4xl">🌙</span>
      ) : (
        <span className="text-black text-4xl">☀️</span>
      )}
    </button>
  );
};

export default DarkModeBtnCircle;
