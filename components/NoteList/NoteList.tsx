import type { Note } from "@/types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api";
import Link from "next/link";
import css from "./NoteList.module.css";

// Пропсы: onDeleted — чтобы родительский компонент мог показать уведомление (toast)
interface NoteListProps {
    notes: Note[];
    onDeleted?: (note: Note) => void; // сообщить о успехе
}

/**
 * Список заметок с интегрированным удалением через TanStack Query.
 * Добавлена ссылка для перехода на страницу с деталями заметки.
 */
const NoteList = ({ notes, onDeleted }: NoteListProps) => {
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: deleteNote,
        onSuccess: (data) => {
            // Инвалидируем (обновляем) список заметок после удаления
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            // Сообщаем родительскому компоненту об успехе (для toast)
            onDeleted?.(data);
        },
    });

    return (
        <ul className={css.list}>
            {/* Используем уникальный ключ `id` с бэкенда */}
            {notes.map(({ id, title, content, tag }) => (
                <li key={id} className={css.listItem}>
                    <div>
                        <h2 className={css.title}>{title}</h2>
                        <p className={css.content}>{content}</p>
                    </div>
                    <div className={css.footer}>
                        <span className={css.tag}>{tag}</span>
                        <div className={css.actions}>
                            <Link href={`/notes/${id}`} className={css.link}>
                                View details
                            </Link>
                            <button
                                className={css.button}
                                onClick={() => deleteMutation.mutate(id)}
                                disabled={deleteMutation.isPending}
                            >
                                {deleteMutation.isPending
                                    ? "Deleting..."
                                    : "Delete"}
                            </button>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default NoteList;
