"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { NoteTag } from "@/types/note";

export type DraftNote = {
    title: string;
    content: string;
    tag: NoteTag;
};

export const initialDraft: DraftNote = {
    title: "",
    content: "",
    tag: "Todo",
};

type NoteStore = {
    draft: DraftNote;
    setDraft: (partial: Partial<DraftNote>) => void;
    clearDraft: () => void;
};

export const useNoteStore = create<NoteStore>()(
    persist(
        (set) => ({
            draft: initialDraft,
            setDraft: (partial) =>
                set((state) => ({ draft: { ...state.draft, ...partial } })),
            clearDraft: () => set({ draft: initialDraft }),
        }),
        {
            name: "notehub-draft",
            version: 1,
        }
    )
);
