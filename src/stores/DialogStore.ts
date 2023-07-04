import { create } from 'zustand';

type DialogStore = {
  dialog:
    | 'subscribe'
    | 'manageSubscriptions'
    | 'confirmDeletion'
    | 'massArchive'
    | null;
  subscribeDialog: () => void;
  manageSubscriptionsDialog: () => void;
  confirmDeletionDialog: () => void;
  massArchiveDialog: () => void;
  clearDialog: () => void;
};

export default create<DialogStore>((set) => ({
  dialog: null,
  subscribeDialog: () => set(() => ({ dialog: 'subscribe' })),
  manageSubscriptionsDialog: () =>
    set(() => ({ dialog: 'manageSubscriptions' })),
  confirmDeletionDialog: () => set(() => ({ dialog: 'confirmDeletion' })),
  massArchiveDialog: () => set(() => ({ dialog: 'massArchive' })),
  clearDialog: () => set(() => ({ dialog: null }))
}));
