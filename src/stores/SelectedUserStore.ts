import { RouterOutputs } from 'server/trpc/router/_app';
import { create } from 'zustand';

type SelectedUserStore = {
  selectedUser: RouterOutputs['user']['search'][number] | null;
  setSelectedUser: (
    user: RouterOutputs['user']['search'][number] | null
  ) => void;
};

export default create<SelectedUserStore>((set) => ({
  selectedUser: null,
  setSelectedUser: (selectedUser) => set(() => ({ selectedUser }))
}));
