import type { Metadata } from "next";
import ClientNoteFormWrapper from "@/components/CreateNote/ClientNoteFormWrapper";
import css from "@/components/CreateNote/CreateNotePage.module.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
    title: "Create Note | NoteHub",
    description: "Create a new note in your NoteHub.",
    openGraph: {
        title: "Create Note | NoteHub",
        description: "Create a new note in your NoteHub.",
        url: `${siteUrl}/notes/action/create`,
        images: ["/notehub-og-meta.webp"],
        type: "website",
    },
};

export default function CreateNotePage() {
    return (
        <main className={css.main}>
            <div className={css.container}>
                <h1 className={css.title}>Create Note</h1>
                <ClientNoteFormWrapper />
            </div>
        </main>
    );
}
