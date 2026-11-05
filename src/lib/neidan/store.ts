import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Tab = "path" | "scroll" | "now" | "arsenal";

type NeiDanState = {
  entered: boolean;
  tab: Tab;
  readerId: string | null;
  fieldId: string | null;
  sessionId: string | null;
  sessionNote: string | null;
  lastSessionId: string | null;
  sound: boolean;
  enter: () => void;
  setTab: (tab: Tab) => void;
  openReader: (id: string) => void;
  closeReader: () => void;
  openField: (id: string) => void;
  closeField: () => void;
  openSession: (id: string, note?: string | null) => void;
  closeSession: () => void;
  rememberSession: (id: string) => void;
  setSound: (sound: boolean) => void;
};

export const useNeidan = create<NeiDanState>()(
  persist(
    (set) => ({
      entered: false,
      tab: "path",
      readerId: null,
      fieldId: null,
      sessionId: null,
      sessionNote: null,
      lastSessionId: null,
      sound: true,
      enter: () => set({ entered: true, tab: "path" }),
      setTab: (tab) => set({ tab, readerId: null, fieldId: null }),
      openReader: (readerId) => set({ readerId, tab: "scroll", fieldId: null }),
      closeReader: () => set({ readerId: null }),
      openField: (fieldId) => set({ fieldId, tab: "path", readerId: null }),
      closeField: () => set({ fieldId: null }),
      openSession: (sessionId, note = null) => set({ sessionId, sessionNote: note }),
      closeSession: () => set({ sessionId: null, sessionNote: null }),
      rememberSession: (lastSessionId) => set({ lastSessionId }),
      setSound: (sound) => set({ sound }),
    }),
    {
      name: "neidan-return",
      partialize: (state) => ({
        entered: state.entered,
        tab: state.tab,
        lastSessionId: state.lastSessionId,
        sound: state.sound,
      }),
    },
  ),
);
