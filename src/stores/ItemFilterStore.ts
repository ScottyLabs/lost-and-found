import { Category, Color, Location } from '@prisma/client';
import { create } from 'zustand';

type ItemFilterStore = {
  date: Date | null;
  categories: Category[];
  locations: Location[];
  colors: Color[];
  setFilter: ({
    date,
    categories,
    locations,
    colors
  }: {
    date: Date | null;
    categories: Category[];
    locations: Location[];
    colors: Color[];
  }) => void;
  resetFilter: () => void;
};

export default create<ItemFilterStore>((set) => ({
  date: null,
  categories: [],
  locations: [],
  colors: [],
  setFilter: ({ date = null, categories = [], locations = [], colors = [] }) =>
    set(() => ({ date, categories, locations, colors })),
  resetFilter: () =>
    set(() => ({ date: null, categories: [], locations: [], colors: [] }))
}));
