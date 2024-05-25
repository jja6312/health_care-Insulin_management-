import { useEffect } from "react";
import { useDarkModeStore } from "../../store/useDarkModeStore";

const useDarkMode = () => {
  const { isDarkMode, setIsDarkMode } = useDarkModeStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return { isDarkMode, setIsDarkMode };
};

export default useDarkMode;
