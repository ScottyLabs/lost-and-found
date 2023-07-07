import { User } from '@prisma/client';
import { create } from 'zustand';

type SelectedUserStore = {
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
};

export default create<SelectedUserStore>((set) => ({
  selectedUser: null,
  setSelectedUser: (selectedUser) => set(() => ({ selectedUser }))
}));
