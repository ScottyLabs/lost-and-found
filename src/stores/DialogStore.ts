import { create } from 'zustand';

type DialogStore = {
  dialog:
    | 'createItem'
    | 'editItem'
    | 'subscribe'
    | 'manageSubscriptions'
    | null;
  createItemDialog: () => void;
  editItemDialog: () => void;
  subscribeDialog: () => void;
  manageSubscriptionsDialog: () => void;
  clearDialog: () => void;
};

export default create<DialogStore>((set) => ({
  dialog: null,
  createItemDialog: () => set(() => ({ dialog: 'createItem' })),
  editItemDialog: () => set(() => ({ dialog: 'editItem' })),
  subscribeDialog: () => set(() => ({ dialog: 'subscribe' })),
  manageSubscriptionsDialog: () =>
    set(() => ({ dialog: 'manageSubscriptions' })),
  clearDialog: () => set(() => ({ dialog: null }))
}));
