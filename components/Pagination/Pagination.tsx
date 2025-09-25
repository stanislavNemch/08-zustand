"use client";

import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

// Определяем типы для пропсов, которые компонент ожидает получить
interface PaginationProps {
    pageCount: number;
    onPageChange: (selectedItem: { selected: number }) => void;
    currentPage: number; // Текущая страница (начиная с 1)
}

/**
 * Управляемый компонент пагинации.
 * Синхронизирует активную страницу через `forcePage`.
 */
const Pagination = ({
    pageCount,
    onPageChange,
    currentPage,
}: PaginationProps) => {
    return (
        <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={onPageChange}
            // `forcePage` ожидает индекс (начиная с 0), поэтому вычитаем 1
            forcePage={Math.max(0, (currentPage || 1) - 1)}
            containerClassName={css.pagination}
            activeClassName={css.active}
            pageLinkClassName={css.pageLink}
            previousLinkClassName={css.pageLink}
            nextLinkClassName={css.pageLink}
            breakLinkClassName={css.pageLink}
        />
    );
};

export default Pagination;
