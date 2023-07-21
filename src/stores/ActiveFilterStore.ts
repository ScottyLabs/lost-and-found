import { create } from 'zustand';

type ActiveFilterStore = {
  filter: 'date' | 'category' | 'location' | 'color' | null;
  setFilter: ({
    filter
  }: {
    filter: 'date' | 'category' | 'location' | 'color' | null;
  }) => void;
  resetFilter: () => void;
};

export default create<ActiveFilterStore>((set) => ({
  filter: null,
  setFilter: ({ filter = null }) => set(() => ({ filter })),
  resetFilter: () => set(() => ({ filter: null }))
}));
