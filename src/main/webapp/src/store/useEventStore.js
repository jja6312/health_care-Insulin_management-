import { create } from "zustand";

export const useEventStore = create((set) => ({
  isEventModalOpen: false,
  selectedEvent: null,
  setIsEventModalOpen: (val) => set({ isEventModalOpen: val }),
  setSelectedEvent: (val) => set({ selectedEvent: val }),
}));
