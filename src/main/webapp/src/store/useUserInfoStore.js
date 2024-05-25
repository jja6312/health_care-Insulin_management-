import { create } from "zustand";

export const useUserInfoStore = create((set) => ({
  userInfoDTO: null,
  setUserInfoDTO: (userInfoDTO) => set({ userInfoDTO }),
}));
