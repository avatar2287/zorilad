import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Tab = "path" | "kai" | "arsenal" | "events" | "profile";

export type View =
  | { kind: "tabs" }
  | { kind: "map" }
  | { kind: "scroll"; id: string }
  | { kind: "seal"; id: string }
  | { kind: "kai"; id: string }
  | { kind: "key"; id: string }
  | { kind: "journal" }
  | { kind: "body" }
  | { kind: "letter" };

export type Note = { id: string; text: string; at: number };
export type Trace = { id: string; label: string; at: number };

type AurlisState = {
  entered: boolean;
  tab: Tab;
  view: View;
  completed: string[];
  journal: Note[];
  letter: string;
  traces: Trace[];
  name: string;
  intention: string;
  sound: boolean;
  enter: () => void;
  setTab: (tab: Tab) => void;
  setView: (view: View) => void;
  backToTabs: () => void;
  completeScroll: (id: string, label: string) => void;
  addJournal: (text: string) => void;
  setLetter: (letter: string) => void;
  addTrace: (label: string) => void;
  setName: (name: string) => void;
  setIntention: (intention: string) => void;
  setSound: (sound: boolean) => void;
  resetPath: () => void;
};

function stamp(label: string): Trace {
  return { id: `${Date.now()}`, label, at: Date.now() };
}

export const useAurlis = create<AurlisState>()(
  persist(
    (set) => ({
      entered: false,
      tab: "path",
      view: { kind: "tabs" },
      completed: [],
      journal: [],
      letter: "",
      traces: [],
      name: "",
      intention: "",
      sound: true,
      enter: () => set({ entered: true, tab: "path", view: { kind: "tabs" } }),
      setTab: (tab) => set({ tab, view: { kind: "tabs" } }),
      setView: (view) => set({ view }),
      backToTabs: () => set({ view: { kind: "tabs" } }),
      completeScroll: (id, label) =>
        set((state) => ({
          completed: state.completed.includes(id) ? state.completed : [...state.completed, id],
          traces: [stamp(label), ...state.traces].slice(0, 40),
        })),
      addJournal: (text) =>
        set((state) => ({
          journal: [{ id: `${Date.now()}`, text, at: Date.now() }, ...state.journal].slice(0, 30),
        })),
      setLetter: (letter) => set({ letter }),
      addTrace: (label) => set((state) => ({ traces: [stamp(label), ...state.traces].slice(0, 40) })),
      setName: (name) => set({ name }),
      setIntention: (intention) => set({ intention }),
      setSound: (sound) => set({ sound }),
      resetPath: () => set({ completed: [], view: { kind: "map" } }),
    }),
    {
      name: "aurlis-path",
      partialize: (state) => ({
        entered: state.entered,
        tab: state.tab,
        completed: state.completed,
        journal: state.journal,
        letter: state.letter,
        traces: state.traces,
        name: state.name,
        intention: state.intention,
        sound: state.sound,
      }),
    },
  ),
);
