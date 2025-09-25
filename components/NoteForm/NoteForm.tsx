"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createNote } from "@/lib/api";
import type { NoteTag } from "@/types/note";
import { useNoteStore } from "@/lib/store/noteStore";
import * as Yup from "yup";
import css from "./NoteForm.module.css";

interface NoteFormProps {
    onCancel: () => void;
}

const TAGS: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

// Схема валидации Yup
const schema = Yup.object({
    title: Yup.string()
        .trim()
        .min(3, "Title must be at least 3 characters")
        .max(50, "Title must be at most 50 characters")
        .required("Title is required"),
    content: Yup.string().max(500, "Content must be at most 500 characters"),
    tag: Yup.mixed<NoteTag>()
        .oneOf(TAGS, "Invalid tag value")
        .required("Tag is required"),
});

type FormErrors = Partial<Record<"title" | "content" | "tag", string>>;

function validateDraft(draft: {
    title: string;
    content: string;
    tag: NoteTag;
}): FormErrors {
    try {
        schema.validateSync(draft, { abortEarly: false });
        return {};
    } catch (err) {
        const errors: FormErrors = {};
        if (err instanceof Yup.ValidationError) {
            // Собираем первую ошибку на поле
            for (const e of err.inner) {
                const path = e.path as keyof FormErrors | undefined;
                if (path && !errors[path]) {
                    errors[path] = e.message;
                }
            }
        }
        return errors;
    }
}

const NoteForm = ({ onCancel }: NoteFormProps) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { draft, setDraft, clearDraft } = useNoteStore();

    const errors = validateDraft(draft);
    const isValid = Object.keys(errors).length === 0;

    const createMutation = useMutation({
        mutationFn: createNote,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["notes"] });
            clearDraft(); // очищаем черновик только при успешном создании
            router.back(); // возвращаемся на предыдущую страницу
        },
    });

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Дополнительная защита на случай гонок
        if (!isValid || createMutation.isPending) return;

        createMutation.mutate({
            title: draft.title.trim(),
            content: draft.content,
            tag: draft.tag,
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
