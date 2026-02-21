import { Category, Color, Location } from '@prisma/client';
import { create } from 'zustand';

type ItemFilterStore = {
  dateStart: Date | null;
  dateEnd: Date | null;
  categories: Category[];
  locations: Location[];
  colors: Color[];
  setFilter: ({
    dateStart,
    dateEnd,
    categories,
    locations,
    colors
  }: {
    dateStart: Date | null;
    dateEnd: Date | null;
    categories: Category[];
    locations: Location[];
    colors: Color[];
  }) => void;
  resetFilter: () => void;
};

export default create<ItemFilterStore>((set) => ({
  dateStart: null,
  dateEnd: null,
  categories: [],
  locations: [],
  colors: [],
  setFilter: ({
    dateStart = null,
    dateEnd = null,
    categories = [],
    locations = [],
    colors = []
  }) => set(() => ({ dateStart, dateEnd, categories, locations, colors })),
  resetFilter: () =>
    set(() => ({
      dateStart: null,
      dateEnd: null,
      categories: [],
      locations: [],
      colors: []
    }))
}));
