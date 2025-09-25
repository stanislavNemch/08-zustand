import type { Metadata } from "next";
import css from "./Home.module.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
    title: "Page not found | NoteHub",
    description: "The page you’re looking for doesn’t exist on NoteHub.",
    openGraph: {
        title: "Page not found | NoteHub",
        description: "The page you’re looking for doesn’t exist on NoteHub.",
        url: `${siteUrl}/not-found`,
        images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
        type: "website",
    },
};

export default function NotFound() {
    return (
        <div className={css.container}>
            <h1 className={css.title}>404 - Page not found</h1>
            <p className={css.description}>
                Sorry, the page you are looking for does not exist.
            </p>
        </div>
    );
}
