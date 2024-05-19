import { create } from 'zustand';

type NewAccountState = {
  opened: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewAccount = create<NewAccountState>((set) => ({
  opened: false,
  onOpen: () => {
    set({ opened: true });
  },

  onClose: () => {
    set({ opened: false });
  },
}));
