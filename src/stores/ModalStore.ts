import { create } from 'zustand';

type ModalStore = {
  modal: 'createItem' | 'editItem' | 'subscribe' | null;
  createItemModal: () => void;
  editItemModal: () => void;
  subscribeModal: () => void;
  clearModal: () => void;
};

export default create<ModalStore>((set) => ({
  modal: null,
  createItemModal: () => set(() => ({ modal: 'createItem' })),
  editItemModal: () => set(() => ({ modal: 'editItem' })),
  subscribeModal: () => set(() => ({ modal: 'subscribe' })),
  clearModal: () => set(() => ({ modal: null }))
}));
