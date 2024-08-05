import { create } from "zustand";

export const useSecondScreenStore = create((set) => ({
  showSecondScreen: false,
  setShowSecondScreen: (bool) => set({ showSecondScreen: bool }),
}));
