import { create } from 'zustand';

type DialogStore = {
  dialog: 'subscribe' | 'manageSubscriptions' | null;
  subscribeDialog: () => void;
  manageSubscriptionsDialog: () => void;
  clearDialog: () => void;
};

export default create<DialogStore>((set) => ({
  dialog: null,
  subscribeDialog: () => set(() => ({ dialog: 'subscribe' })),
  manageSubscriptionsDialog: () =>
    set(() => ({ dialog: 'manageSubscriptions' })),
  clearDialog: () => set(() => ({ dialog: null }))
}));
