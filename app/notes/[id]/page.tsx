import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";

// Типизируем `params` как Promise
interface NoteDetailsPageProps {
    params: Promise<{ id: string }>;
}

export default async function NoteDetailsPage({
    params,
}: NoteDetailsPageProps) {
    const queryClient = new QueryClient();

    // Явно ожидаем (await) на Promise
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
