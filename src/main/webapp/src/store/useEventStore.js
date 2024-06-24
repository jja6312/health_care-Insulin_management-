import { create } from "zustand";

export const useEventStore = create((set) => ({
  isEventModalOpen: false,
  selectedEvent: null,
  readList: [],
  setIsEventModalOpen: (val) => set({ isEventModalOpen: val }),
  setSelectedEvent: (val) => set({ selectedEvent: val }),
  setReadList: (val) => set({ readList: val }),
}));
