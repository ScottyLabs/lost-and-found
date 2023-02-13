import { create } from 'zustand';

type DrawerStore = {
  drawer: 'main' | 'filter';
  mainDrawer: () => void;
  filterDrawer: () => void;
};

export default create<DrawerStore>((set) => ({
  drawer: 'main',
  mainDrawer: () => set(() => ({ drawer: 'main' })),
  filterDrawer: () => set(() => ({ drawer: 'filter' }))
}));
