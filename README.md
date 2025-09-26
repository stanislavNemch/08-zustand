# NoteHub (Next.js, Zustand, TanStack Query)

## (UK) 🇺🇦

Простий та ефективний застосунок для керування особистими нотатками, створений за допомогою Next.js. Проєкт демонструє оптимізацію продуктивності, SEO-налаштування та сучасні підходи до керування станом на клієнті та сервері.

### 🎯 Основні можливості

- **Створення, перегляд та видалення** нотаток.
- **Фільтрація** нотаток за тегами та повнотекстовий **пошук**.
- **Збереження чернетки** нотатки в `localStorage` під час створення.
- **Динамічна пагінація** для зручної навігації.
- **Адаптивний дизайн** зі стилізацією через CSS Modules.

### ✅ Що було реалізовано та вивчено

В рамках цього проєкту були реалізовані наступні завдання:

1.  **SEO Оптимізація**:
    - Додано глобальні метатеги (`title`, `description`, Open Graph) у головному `layout.tsx`.
    - Реалізовано динамічну генерацію метаданих для сторінок нотаток та фільтрів за допомогою функції `generateMetadata`/page.tsx, stanislavnemch/08-zustand/08-zustand-3e2081d3ab034e12ef972a2bfd401af50b9bfb82/app/notes/filter/[...slug]/page.tsx].

2.  **Керування станом та рефакторинг**:
    - Керування станом чернетки форми реалізовано за допомогою **Zustand**.
    - Додано збереження чернетки в `localStorage` за допомогою `persist` middleware, що дозволяє користувачеві не втрачати дані після перезавантаження сторінки.
    - Проведено рефакторинг форми створення нотатки: логіку перенесено з модального вікна на окрему сторінку `/notes/action/create`.
    - Видалено бібліотеку `Formik` на користь стандартних можливостей React та кастомної валідації для спрощення коду.

3.  **Робота з даними**:
    - Керування серверним станом (запити до API) реалізовано через **TanStack Query (React Query)**.
    - Використано SSR для попередньої вибірки даних на сервері (`prefetchQuery`), що прискорює початкове завантаження сторінок/page.tsx].

### 🛠️ Технології

| Технологія         | Опис                                                          |
| :----------------- | :------------------------------------------------------------ |
| **Next.js**        | React-фреймворк з рендерингом на сервері (SSR) та App Router. |
| **React**          | Бібліотека для створення користувацьких інтерфейсів.          |
| **TypeScript**     | Типізація для надійності та масштабованості коду.             |
| **Zustand**        | Мінімалістична бібліотека для керування станом на клієнті.    |
| **TanStack Query** | Керування асинхронними операціями та кешування даних.         |
| **Axios**          | HTTP-клієнт для взаємодії з API.                              |
| **CSS Modules**    | Локалізація стилів для уникнення конфліктів класів.           |

### 📂 Структура проєкту

```
/
├── app/                  # Маршрутизація App Router
│   ├── @modal/           # Паралельний маршрут для модальних вікон
│   ├── notes/            # Маршрути, пов'язані з нотатками
│   │   ├── filter/       # Сторінки фільтрації
│   │   │   ├── @sidebar/ # Паралельний маршрут для сайдбару
│   │   └── [id]/         # Динамічна сторінка нотатки
│   ├── layout.tsx        # Головний макет
│   └── page.tsx          # Головна сторінка
├── components/           # Перевикористовувані React-компоненти
├── lib/                  # Допоміжні функції
│   ├── api.ts            # Функції для роботи з API
│   └── store/            # Zustand-стор для керування станом
├── public/               # Статичні файли (іконки, зображення)
└── types/                # Глобальні типи TypeScript
```

### 🚀 Встановлення та запуск

1.  **Клонуйте репозиторій:**

    ```bash
    git clone <URL_РЕПОЗИТОРІЮ>
    cd <НАЗВА_ПАПКИ>
    ```

2.  **Встановіть залежності:**

    ```bash
    npm install
    ```

3.  **Створіть файл оточення:**
    Створіть файл `.env.local` в корені проєкту та додайте ваш токен для API:

    ```
    NEXT_PUBLIC_NOTEHUB_TOKEN=ваш_токен_тут
    ```

4.  **Запустіть проєкт:**

    ```bash
    npm run dev
    ```

    Застосунок буде доступний за адресою `http://localhost:3000`.

---

---

## (EN) 🇬🇧

A simple and efficient application for managing personal notes, built with Next.js. This project demonstrates performance optimization, SEO setup, and modern approaches to client-side and server-side state management.

### 🎯 Key Features

- **Create, view, and delete** notes.
- **Filter** notes by tags and perform a full-text **search**.
- **Save a draft** of a note to `localStorage` during creation.
- **Dynamic pagination** for easy navigation.
- **Responsive design** with styling via CSS Modules.

### ✅ What Was Implemented & Learned

Throughout this project, the following tasks were completed:

1.  **SEO Optimization**:
    - Added global meta tags (`title`, `description`, Open Graph) in the main `layout.tsx`.
    - Implemented dynamic metadata generation for note and filter pages using the `generateMetadata` function/page.tsx, stanislavnemch/08-zustand/08-zustand-3e2081d3ab034e12ef972a2bfd401af50b9bfb82/app/notes/filter/[...slug]/page.tsx].

2.  **State Management & Refactoring**:
    - Managed the form draft state using **Zustand**.
    - Added draft persistence to `localStorage` using the `persist` middleware, preventing data loss on page reload.
    - Refactored the note creation form: logic was moved from a modal to a dedicated page at `/notes/action/create`.
    - Removed the `Formik` library in favor of standard React capabilities and custom validation to simplify the code.

3.  **Data Handling**:
    - Managed server state (API requests) with **TanStack Query (React Query)**.
    - Utilized SSR to prefetch data on the server (`prefetchQuery`), speeding up initial page loads/page.tsx].

### 🛠️ Technologies

| Technology         | Description                                                            |
| :----------------- | :--------------------------------------------------------------------- |
| **Next.js**        | A React framework with Server-Side Rendering (SSR) and the App Router. |
| **React**          | A library for building user interfaces.                                |
| **TypeScript**     | Type safety for code reliability and scalability.                      |
| **Zustand**        | A minimalistic library for client-side state management.               |
| **TanStack Query** | For managing asynchronous operations and caching data.                 |
| **Axios**          | An HTTP client for interacting with the API.                           |
| **CSS Modules**    | For locally scoped styles to prevent class name conflicts.             |

### 📂 Project Structure

```
/
├── app/                  # App Router routing
│   ├── @modal/           # Parallel route for modals
│   ├── notes/            # Routes related to notes
│   │   ├── filter/       # Filter pages
│   │   │   ├── @sidebar/ # Parallel route for the sidebar
│   │   └── [id]/         # Dynamic note page
│   ├── layout.tsx        # Main layout
│   └── page.tsx          # Home page
├── components/           # Reusable React components
├── lib/                  # Helper functions
│   ├── api.ts            # API interaction functions
│   └── store/            # Zustand store for state management
├── public/               # Static assets (icons, images)
└── types/                # Global TypeScript types
```

### 🚀 Installation and Launch

1.  **Clone the repository:**

    ```bash
    git clone <REPOSITORY_URL>
    cd <FOLDER_NAME>
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Create an environment file:**
    Create a `.env.local` file in the project root and add your API token:

    ```
    NEXT_PUBLIC_NOTEHUB_TOKEN=your_token_here
    ```

4.  **Run the project:**

    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:3000`.
