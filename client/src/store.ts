import { create } from "zustand"


interface StoreProps {
    isOpen: boolean,
    onClose: () => void;
    onOpen: () => void;
}



export const useUploadDocModal = create<StoreProps>((set) => ({
    isOpen: false,
    onClose: () => set({ isOpen: false }),
    onOpen: () => set({ isOpen: true }),
}));

export const useFilter = create<StoreProps>((set, get) => ({
    isOpen: false,
    onClose: () => set({ isOpen: false }),
    onOpen: () => set({ isOpen:!get().isOpen }),
}));

