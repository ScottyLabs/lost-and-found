import { create } from 'zustand';

type DialogStore = {
  dialog:
    | 'subscribe'
    | 'manageSubscriptions'
    | 'confirmItemDeletion'
    | 'massArchive'
    | 'confirmUserDeletion'
    | 'editUser'
    | null;
  subscribeDialog: () => void;
  manageSubscriptionsDialog: () => void;
  confirmItemDeletionDialog: () => void;
  massArchiveDialog: () => void;
  editUserDialog: () => void;
  clearDialog: () => void;
};

export default create<DialogStore>((set) => ({
  dialog: null,
  subscribeDialog: () => set(() => ({ dialog: 'subscribe' })),
  manageSubscriptionsDialog: () =>
    set(() => ({ dialog: 'manageSubscriptions' })),
  confirmItemDeletionDialog: () =>
    set(() => ({ dialog: 'confirmItemDeletion' })),
  massArchiveDialog: () => set(() => ({ dialog: 'massArchive' })),
  editUserDialog: () => set(() => ({ dialog: 'editUser' })),
  clearDialog: () => set(() => ({ dialog: null }))
}));
