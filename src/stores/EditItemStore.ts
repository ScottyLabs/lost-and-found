import { create } from 'zustand';

type EditItemStore = {
  itemId: string | null;
  setItem: (itemId: string) => void;
};

export default create<EditItemStore>((set) => ({
  itemId: null,
  setItem: (itemId) => set(() => ({ itemId }))
}));
