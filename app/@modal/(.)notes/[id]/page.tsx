import NotePreview from "@/app/@modal/(.)notes/[id]/NotePreview.client";
import { fetchNoteById } from "@/lib/api";
import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from "@tanstack/react-query";

// Типизируем `params` как Promise
interface NoteModalProps {
    params: Promise<{ id: string }>;
}

export default async function NoteModal({ params }: NoteModalProps) {
    const { id } = await params;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotePreview noteId={id} />
        </HydrationBoundary>
    );
}
