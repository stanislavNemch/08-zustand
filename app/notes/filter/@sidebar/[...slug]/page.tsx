"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // Хук для определения активного маршрута
import css from "./Sidebar.module.css";

export default function SidebarNotes() {
    const tags = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];
    const pathname = usePathname(); // Получаем текущий URL

    return (
        <aside className={css.sidebar}>
            <h2 className={css.title}>Filter by Tag</h2>
            <ul className={css.menuList}>
                {tags.map((tag) => {
                    const href = `/notes/filter/${tag}`;
                    const isActive = pathname === href; // Проверяем, активна ли ссылка

                    return (
                        <li key={tag} className={css.menuItem}>
                            <Link
                                href={href}
                                className={`${css.menuLink} ${isActive ? css.active : ""}`}
                            >
                                {tag === "All" ? "All notes" : tag}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
}
