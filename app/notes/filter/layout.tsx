import css from "./[...slug]/NotesPage.module.css";
export default function FilterLayout({
    children,
    sidebar,
}: {
    children: React.ReactNode;
    sidebar: React.ReactNode;
}) {
    return (
        <div className={css.app} style={{ display: "flex", gap: "2rem" }}>
            {sidebar}
            <div style={{ flex: 1 }}>{children}</div>
        </div>
    );
}
