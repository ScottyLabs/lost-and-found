import { Building, Category, Color } from '@prisma/client';
import { create } from 'zustand';

type ItemFilterStore = {
  date: Date | null;
  category: Category | null;
  location: Building | null;
  color: Color | null;
  setFilter: ({
    date,
    category,
    location,
    color
  }: {
    date: Date | null;
    category: Category | null;
    location: Building | null;
    color: Color | null;
  }) => void;
  resetFilter: () => void;
};

export default create<ItemFilterStore>((set) => ({
  date: null,
  category: null,
  location: null,
  color: null,
  setFilter: ({
    date = null,
    category = null,
    location = null,
    color = null
  }) => set(() => ({ date, category, location, color })),
  resetFilter: () =>
    set(() => ({ date: null, category: null, location: null, color: null }))
}));
