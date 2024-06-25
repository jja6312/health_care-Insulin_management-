import { create } from "zustand";

export const useDarkModeStore = create((set) => ({
  isDarkMode: localStorage.getItem("theme") === "dark",
  setIsDarkMode: (isDarkMode) => set({ isDarkMode }),
}));
