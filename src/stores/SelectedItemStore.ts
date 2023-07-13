import { create } from 'zustand';

type SelectedItemsStore = {
  selectedItems: string[];
  setSelectedItems: (items: string[]) => void;
};

export default create<SelectedItemsStore>((set) => ({
  selectedItems: [],
  setSelectedItems: (selectedItems) => set(() => ({ selectedItems }))
}));
