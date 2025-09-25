import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

// Типизируем `params` как Promise
interface NotesPageProps {
    params: Promise<{ slug?: string[] }>;
}

export default async function NotesFilterPage({ params }: NotesPageProps) {
    const queryClient = new QueryClient();

    // Явно ожидаем (await) на Promise
    const resolvedParams = await params;
    const tag =
        resolvedParams.slug?.[0] && resolvedParams.slug[0] !== "All"
            ? resolvedParams.slug[0]
            : "";

    await queryClient.prefetchQuery({
        queryKey: ["notes", 1, "", tag],
        queryFn: () => fetchNotes({ page: 1, query: "", tag }),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient tag={tag} />
        </HydrationBoundary>
    );
}
