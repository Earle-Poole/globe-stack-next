import create from 'zustand';

interface SignInStore {
  isLoggedIn: boolean
  username: string | null
  setIsLoggedIn(arg: boolean): void
}

const initialState = {
  isLoggedIn: true,
  username: null,
}

const useSignInStore = create<SignInStore>((set) => ({
  ...initialState,
  setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
}));

export {
  useSignInStore,
}