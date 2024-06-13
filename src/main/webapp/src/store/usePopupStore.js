import { create } from "zustand";

export const usePopupStore = create((set) => ({
  openPopup: true,

  setOpenPopup: (openPopup) => set({ openPopup }),
}));
