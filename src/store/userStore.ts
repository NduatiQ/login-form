import create from 'zustand';

interface FormValues {
  email: string;
  password: string;
}

interface UserStore {
  user: FormValues | null;
  setUser: (user: FormValues) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user: FormValues) => set({ user }),
}));