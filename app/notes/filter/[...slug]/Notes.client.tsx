"use client";

import { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import css from "./NotesPage.module.css";

const NotesClient = ({ tag }: { tag: string }) => {
    const [page, setPage] = useState<number>(1);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [debouncedQuery] = useDebounce(searchQuery, 500);

    useEffect(() => {
        setPage(1);
    }, [debouncedQuery, tag]);

    const { data: notesData, isLoading } = useQuery({
        queryKey: ["notes", page, debouncedQuery, tag],
        queryFn: () => fetchNotes({ page, query: debouncedQuery, tag }),
        placeholderData: keepPreviousData,
    });

    const handlePageClick = (event: { selected: number }): void => {
        setPage(event.selected + 1);
    };

    const handleDeleted = () => toast.success("Note deleted successfully!");

    return (
        <div>
            <Toaster position="top-right" />
            <header className={css.toolbar}>
                <SearchBox value={searchQuery} onChange={setSearchQuery} />
                {notesData && notesData.totalPages > 1 && (
                    <Pagination
                        pageCount={notesData.totalPages}
                        currentPage={page}
                        onPageChange={handlePageClick}
                    />
                )}
                {/* замість кнопки тепер посилання */}
                <Link href="/notes/action/create" className={css.button}>
                    Create note +
                </Link>
            </header>
            <main>
                {isLoading && <p>Loading notes...</p>}
                {notesData && (
                    <NoteList
                        notes={notesData.notes}
                        onDeleted={handleDeleted}
                    />
                )}
            </main>
        </div>
    );
};

export default NotesClient;
