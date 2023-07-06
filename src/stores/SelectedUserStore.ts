import { create } from 'zustand';

type SelectedUsersStore = {
  selectedUsers: string[];
  setSelectedUsers: (items: string[]) => void;
};

export default create<SelectedUsersStore>((set) => ({
  selectedUsers: [],
  setSelectedUsers: (selectedUsers) =>
    set(() => ({ selectedUsers: selectedUsers }))
}));
