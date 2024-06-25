import { create } from "zustand";

export const useLoginStore = create((set) => ({
  loginDTO: {
    empId: "",
    password: "",
  },
  loading: false,
  error: null,

  setLoginDTO: (key, val) =>
    set((state) => ({
      loginDTO: {
        ...state.loginDTO,
        [key]: val,
      },
    })),

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  logout: () => {
    sessionStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    console.log("로그아웃 성공");
  },
}));
