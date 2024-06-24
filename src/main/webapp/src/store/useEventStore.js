import { create } from "zustand";

export const useEventStore = create((set) => ({
  eventList: [],
  noticeList: [],
  isEventModalOpen: false,
  selectedEvent: null,
  readList: [],
  setEventList: (val) => set({ eventList: val }),
  setNoticeList: (val) => set({ noticeList: val }),
  setIsEventModalOpen: (val) => set({ isEventModalOpen: val }),
  setSelectedEvent: (val) => set({ selectedEvent: val }),
  setReadList: (val) => set({ readList: val }),
}));
