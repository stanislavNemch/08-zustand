"use client";

import css from "./SearchBox.module.css";

interface SearchBoxProps {
    // Текущее значение поля поиска.
    value: string;
    // Функция-обработчик, которая вызывается при изменении значения в поле.
    onChange: (newValue: string) => void;
}

/**
 * Компонент текстового поля для поиска заметок.
 * @param {SearchBoxProps} props - Пропсы компонента.
 */
const SearchBox = ({ value, onChange }: SearchBoxProps) => {
    // Обработчик изменения значения в поле ввода.
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <input
            className={css.input}
            type="text"
            placeholder="Search notes"
            value={value}
            onChange={handleChange}
        />
    );
};

export default SearchBox;
