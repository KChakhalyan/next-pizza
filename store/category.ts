import { create } from "zustand";

interface State {
    activeId: number;
    setActivId: (activId: number) => void;
}

export const useCatrygoryStore = create<State>()((set) => ({
    activeId: 1,
    setActivId: (activeId) => set(() => ({ activeId }))
}));