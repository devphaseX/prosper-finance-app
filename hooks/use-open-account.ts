import { create } from 'zustand';

type UseOpenAccountState = {
  opened: boolean;
  id?: string | null;
  onOpen: (id: string) => void;
  onClose: () => void;
};

export const useOpenAccount = create<UseOpenAccountState>((set) => ({
  opened: false,
  onOpen: (id) => {
    set({ opened: true, id });
  },

  onClose: () => {
    set({ opened: false, id: null });
  },
}));
