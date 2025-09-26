// components/NoteForm/NoteForm.tsx

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createNote } from "@/lib/api";
import type { NoteTag } from "@/types/note";
import { useNoteStore, DraftNote } from "@/lib/store/noteStore";
import css from "./NoteForm.module.css";

interface NoteFormProps {
    onCancel: () => void;
}

const TAGS: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

type FormErrors = Partial<Record<keyof DraftNote, string>>;

// Оновлена функція валідації
const validateDraft = (draft: DraftNote): FormErrors => {
    const errors: FormErrors = {};

    // Валідація 'title'
    const title = draft.title.trim();
    if (!title) {
        errors.title = "Title is required";
    } else if (title.length < 3) {
        errors.title = "Title must be at least 3 characters";
    } else if (title.length > 50) {
        errors.title = "Title must be at most 50 characters";
    }

    // Валідація 'content'
    const content = draft.content.trim();
    if (!content) {
        errors.content = "Content is required"; // Додаємо перевірку на обов'язковість
    } else if (draft.content.length > 500) {
        errors.content = "Content must be at most 500 characters";
    }

    // Валідація 'tag'
    if (!draft.tag) {
        errors.tag = "Tag is required";
    } else if (!TAGS.includes(draft.tag)) {
        errors.tag = "Invalid tag value";
    }

    return errors;
};

const NoteForm = ({ onCancel }: NoteFormProps) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { draft, setDraft, clearDraft } = useNoteStore();

    const [errors, setErrors] = useState<FormErrors>({});

    useEffect(() => {
        setErrors(validateDraft(draft));
    }, [draft]);

    const isValid = Object.keys(errors).length === 0;

    const createMutation = useMutation({
        mutationFn: createNote,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["notes"] });
            clearDraft();
            router.back();
        },
    });

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isValid) return;

        createMutation.mutate({
            ...draft,
            title: draft.title.trim(),
            content: draft.content.trim(),
        });
    };

    return (
        <form className={css.form} onSubmit={onSubmit}>
            <div className={css.formGroup}>
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    className={css.input}
                    value={draft.title}
                    onChange={(e) => setDraft({ title: e.target.value })}
                />
                {errors.title && (
                    <span className={css.error}>{errors.title}</span>
                )}
            </div>

            <div className={css.formGroup}>
                <label htmlFor="content">Content</label>
                <textarea
                    id="content"
                    name="content"
                    rows={8}
                    className={css.textarea}
                    value={draft.content}
                    onChange={(e) => setDraft({ content: e.target.value })}
                />
                {errors.content && (
                    <span className={css.error}>{errors.content}</span>
                )}
            </div>

            <div className={css.formGroup}>
                <label htmlFor="tag">Tag</label>
                <select
                    id="tag"
                    name="tag"
                    className={css.select}
                    value={draft.tag}
                    onChange={(e) =>
                        setDraft({ tag: e.target.value as NoteTag })
                    }
                >
                    {TAGS.map((t) => (
                        <option key={t} value={t}>
                            {t}
                        </option>
                    ))}
                </select>
                {errors.tag && <span className={css.error}>{errors.tag}</span>}
            </div>

            <div className={css.actions}>
                <button
                    type="button"
                    className={css.cancelButton}
                    onClick={onCancel}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className={css.submitButton}
                    disabled={!isValid || createMutation.isPending}
                >
                    {createMutation.isPending ? "Creating..." : "Create note"}
                </button>
            </div>
        </form>
    );
};

export default NoteForm;
