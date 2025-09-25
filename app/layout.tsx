import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

export const metadata: Metadata = {
    title: "NoteHub",
    description: "Your personal space for notes",
};

export default function RootLayout({
    children,
    modal,
}: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
                <TanStackProvider>
                    <Header />
                    <main>{children}</main>
                    {modal}
                    <Footer />
                </TanStackProvider>
            </body>
        </html>
    );
}
