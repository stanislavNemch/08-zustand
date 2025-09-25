"use client";

import { useRouter } from "next/navigation";
import NoteForm from "@/components/NoteForm/NoteForm";

// Клиентский компонент, чтобы использовать useRouter и обработать Cancel
export default function ClientNoteFormWrapper() {
    const router = useRouter();
    return <NoteForm onCancel={() => router.back()} />;
}
