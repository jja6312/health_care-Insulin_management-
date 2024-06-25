import React from "react";
import { useDarkModeStore } from "../../store/useDarkModeStore";

const DarkModeBtnCircle = () => {
  const { isDarkMode, setIsDarkMode } = useDarkModeStore();

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
