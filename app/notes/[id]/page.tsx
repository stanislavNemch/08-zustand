import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import type { Metadata } from "next";

// Типизируем `params` как Promise
interface NoteDetailsPageProps {
    params: Promise<{ id: string }>;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;

    try {
        const note = await fetchNoteById(id);
        const snippet =
            note.content?.length > 140
                ? `${note.content.slice(0, 140)}…`
                : note.content || "Note details";

        const title = `${note.title} | NoteHub`;
        const url = `${siteUrl}/notes/${id}`;

        return {
            title,
            description: snippet,
            openGraph: {
                title,
                description: snippet,
                url,
                images: [
                    "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                ],
                type: "article",
            },
        };
    } catch {
        const title = "Note | NoteHub";
        const description = "View note details in NoteHub.";
        const url = `${siteUrl}/notes/${id}`;
        return {
            title,
            description,
            openGraph: {
                title,
                description,
                url,
                images: [
                    "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                ],
                type: "article",
            },
        };
    }
}

export default async function NoteDetailsPage({
    params,
}: NoteDetailsPageProps) {
    const queryClient = new QueryClient();

    // Явно ожидаем (await) Promise из params
    const resolvedParams = await params;
    const { id } = resolvedParams;

    await queryClient.prefetchQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailsClient />
        </HydrationBoundary>
    );
}
