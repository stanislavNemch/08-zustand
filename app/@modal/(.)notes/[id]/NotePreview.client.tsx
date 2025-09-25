"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";

type Props = {
    noteId: string;
    onClose?: () => void;
};

const NotePreview = ({ noteId, onClose }: Props) => {
    const router = useRouter();
    const handleClose = onClose ?? (() => router.back());

    const {
        data: note,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["note", noteId],
        queryFn: () => fetchNoteById(noteId),
        refetchOnMount: false,
    });

    return (
        <Modal onClose={handleClose} isOpen>
            {isLoading && (
                <div className={css.container}>
                    <p className={css.content}>Loading note...</p>
                </div>
            )}

            {isError && (
                <div className={css.container}>
                    <button onClick={handleClose} className={css.backBtn}>
                        &larr; Back
                    </button>
                    <div className={css.item}>
                        <p className={css.content}>
                            Failed to load note
                            {error instanceof Error ? `: ${error.message}` : ""}
                        </p>
                    </div>
                </div>
            )}

            {!isLoading && !isError && !note && (
                <div className={css.container}>
                    <button onClick={handleClose} className={css.backBtn}>
                        &larr; Back
                    </button>
                    <div className={css.item}>
                        <p className={css.content}>Note not found</p>
                    </div>
                </div>
            )}

            {note && !isLoading && !isError && (
                <div className={css.container}>
                    <button onClick={handleClose} className={css.backBtn}>
                        &larr; Back
                    </button>
                    <div className={css.item}>
                        <div className={css.header}>
                            <h2>{note.title}</h2>
                            <span className={css.tag}>{note.tag}</span>
                        </div>
                        <p className={css.content}>{note.content}</p>
                        <p className={css.date}>
                            Created: {new Date(note.createdAt).toLocaleString()}
                        </p>
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default NotePreview;
