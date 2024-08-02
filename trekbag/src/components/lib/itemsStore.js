import { create } from "zustand";

export const useItemsStore = create((set) => ({
  items: [],
  handleAddItem: (newItemText) => {
    const newItem = {
      id: new Date().getTime(),
      name: newItemText,
      packed: false,
    };

    set((state) => {
      const newItems = [...state.items, newItem];
      return { items: newItems };
    });
  },
  handleCompleteAll: () => {
    set((state) => {
      const updatedItems = state.items.map((item) => ({
        ...item,
        packed: true,
      }));
      return { items: updatedItems };
    });
  },
  handleIncompleteAll: () => {
    set((state) => {
      const updatedItems = state.items.map((item) => ({
        ...item,
        packed: false,
      }));
      return { items: updatedItems };
    });
  },
  handleRemoveAllItems: () => {
    set(() => ({ items: [] }));
  },
  handleResetAsInitial: () => {
    set(() => ({ items: [] }));
  },
  handleDeleteItem: (id) => {
    set((state) => {
      const updatedItems = state.items.filter((item) => item.id !== id);
      return { items: updatedItems };
    });
  },
  handleToggleItem: (id) => {
    set((state) => {
      const updatedItems = state.items.map((item) => {
        if (item.id === id) {
          return { ...item, packed: !item.packed };
        }
        return item;
      });
      return { items: updatedItems };
    });
  },
  handleSetItems: (newItems) => {
    set(() => ({ items: newItems }));
  }
}));
