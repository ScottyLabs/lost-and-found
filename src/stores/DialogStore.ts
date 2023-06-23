import { create } from 'zustand';

type DialogStore = {
  dialog: 'subscribe' | 'manageSubscriptions' | 'confirmDeletion' | null;
  subscribeDialog: () => void;
  manageSubscriptionsDialog: () => void;
  confirmDeletionDialog: () => void;
  clearDialog: () => void;
};

export default create<DialogStore>((set) => ({
  dialog: null,
  subscribeDialog: () => set(() => ({ dialog: 'subscribe' })),
  manageSubscriptionsDialog: () =>
    set(() => ({ dialog: 'manageSubscriptions' })),
  confirmDeletionDialog: () => set(() => ({ dialog: 'confirmDeletion' })),
  clearDialog: () => set(() => ({ dialog: null }))
}));
