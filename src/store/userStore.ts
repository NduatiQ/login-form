import create from 'zustand';
import { persist } from 'zustand/middleware';

// Define the user data structure
interface UserStore {
  user: {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
} | null;
loginData: {
  logEmail : string;
  logPassword: string;
} | null;

  setUser: (user: UserStore['user']) => void;
  setLoginData: (loginData: UserStore['loginData']) => void;
  clearUser: () => void;
}

//Automatically store data in 'localStorage' and rehydrate it on page load
export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      loginData: null,
      setUser: (user) => set({ user }),
      setLoginData: (loginData) => set({ loginData}),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage', // The key in localStorage
      getStorage: () => localStorage, // Use localStorage and let data persist until session ends
    }
  )
);