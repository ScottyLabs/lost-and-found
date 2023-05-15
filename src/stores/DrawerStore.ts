import { create } from 'zustand';

type DrawerStore = {
  drawer: 'navigate' | 'filter' | 'manage' | null;
  navigateDrawer: () => void;
  filterDrawer: () => void;
  clearDrawer: () => void;
  manageDrawer: () => void;
};

export default create<DrawerStore>((set) => ({
  drawer: null,
  navigateDrawer: () => set(() => ({ drawer: 'navigate' })),
  filterDrawer: () => set(() => ({ drawer: 'filter' })),
  clearDrawer: () => set(() => ({ drawer: null })),
  manageDrawer: () => set(() => ({ drawer: 'manage' }))
}));
