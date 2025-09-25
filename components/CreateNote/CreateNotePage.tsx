import type { Metadata } from "next";
import ClientNoteFormWrapper from "./ClientNoteFormWrapper";
import css from "./CreateNotePage.module.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
    title: "Create note | NoteHub",
    description: "Create a new note in your NoteHub.",
    openGraph: {
        title: "Create note | NoteHub",
        description: "Create a new note in your NoteHub.",
        url: `${siteUrl}/notes/action/create`,
        images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
        type: "website",
    },
};

export default function CreateNotePage() {
    return (
        <main className={css.main}>
            <div className={css.container}>
                <h1 className={css.title}>Create note</h1>
                <ClientNoteFormWrapper />
            </div>
        </main>
    );
}
