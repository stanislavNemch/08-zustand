# NoteHub (Next.js Advanced Routing)

## 🇺🇦 Українська версія

**NoteHub** — це розширена версія веб-додатку для керування нотатками, що демонструє поглиблені можливості маршрутизації в **Next.js (App Router)**. Проєкт еволюціонував від базової багатосторінкової структури до складного додатку з динамічною фільтрацією, паралельним рендерингом та перехопленням маршрутів для кращого користувацького досвіду.

### ✨ Основні функції

- **Фільтрація за тегами**: Нотатки можна фільтрувати за категоріями (`Work`, `Personal` тощо) через динамічні маршрути (`/notes/filter/[...slug]`).
- **Паралельні маршрути**: Сайдбар з тегами та список нотаток рендеряться паралельно, дозволяючи оновлювати контент незалежно один від одного.
- **Перехоплення маршрутів**: При кліку на нотатку її деталі відкриваються у модальному вікні без переходу на окрему сторінку, що покращує UX.
- **Кастомна сторінка 404**: Реалізовано власну сторінку `not-found.tsx` для обробки неіснуючих маршрутів.
- **Серверний рендеринг (SSR)**: Основні дані завантажуються на сервері за допомогою `prefetchQuery` для швидкого першого завантаження та SEO.

### 🚀 Що було вивчено та реалізовано

Цей етап розробки був сфокусований на вивченні та імплементації просунутих технік маршрутизації в Next.js:

1.  **Catch-all Routes (`[...slug]`)**: Створено динамічний маршрут, який "ловить" усі запити на фільтрацію, дозволяючи обробляти як `/notes/filter/All`, так і `/notes/filter/Work` єдиною логікою.
2.  **Parallel Routes (`@slot`)**: Реалізовано паралельний рендеринг двох незалежних частин інтерфейсу — сайдбару (`@sidebar`) та основного контенту (`children`) — в одному `layout`, що дозволяє оновлювати їх окремо.
3.  **Intercepting Routes (`(..)` синтаксис)**: Налаштовано перехоплення маршруту `/notes/[id]`. Замість переходу на окрему сторінку, користувач бачить модальне вікно з деталями нотатки, залишаючись на поточній сторінці списку. Це робить інтерфейс схожим на Single Page Application.
4.  **Організація Layouts**: Побудовано вкладену структуру layout-файлів для різних рівнів маршрутизації, що забезпечує гнучкість та перевикористання UI.

---

### 📂 Структура проєкту

Проєкт організовано згідно з конвенціями Next.js App Router для чіткого розділення серверної та клієнтської логіки.

```
/
├── app/
│   ├── layout.tsx                # Глобальний layout (Header, Footer)
│   ├── page.tsx                  # Головна сторінка ("/")
│   ├── not-found.tsx             # Сторінка 404
│   └── notes/
│       ├── [id]/                 # Реальний маршрут для деталей нотатки (для F5, прямих посилань)
│       │   └── page.tsx
│       └── filter/
│           ├── [...slug]/        # (children) Основний контент (список нотаток)
│           │   └── page.tsx
│           ├── @modal/(..)notes/[id]/ # Перехоплювач для модального вікна
│           │   └── page.tsx
│           ├── @sidebar/         # Паралельний слот для сайдбару
│           │   └── [...slug]/
│           │       └── page.tsx
│           └── layout.tsx        # Layout, що об'єднує @sidebar та children
├── components/                   # Перевикористовувані клієнтські компоненти
├── lib/
│   └── api.ts                    # Функції для роботи з REST API
└── types/
    └── note.ts
```

---

### 🚀 Встановлення та запуск

1.  **Клонуйте репозиторій:**

    ```bash
    git clone <your-repository-url>
    cd 07-routing-nextjs
    ```

2.  **Встановіть залежності:**

    ```bash
    npm install
    ```

3.  **Налаштуйте змінні оточення:**
    Створіть файл `.env.local` у корені проєкту та додайте ваш токен:

    ```
    NEXT_PUBLIC_NOTEHUB_TOKEN=your_api_token_here
    ```

4.  **Запустіть проєкт:**

    ```bash
    npm run dev
    ```

    Додаток буде доступний за адресою [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000).

---

---

## 🇬🇧 English Version

**NoteHub** is an advanced version of the note-management web application, showcasing the powerful routing capabilities of **Next.js (App Router)**. The project has evolved from a basic multi-page structure into a complex application featuring dynamic filtering, parallel rendering, and route interception for an enhanced user experience.

### ✨ Key Features

- **Tag-based Filtering**: Notes can be filtered by categories (`Work`, `Personal`, etc.) using catch-all routes (`/notes/filter/[...slug]`).
- **Parallel Routes**: A sidebar with tags and the main notes list are rendered in parallel, allowing each part of the UI to be updated independently.
- **Intercepting Routes**: When a user clicks on a note, its details are displayed in a modal window without navigating to a separate page, which improves the UX.
- **Custom 404 Page**: A custom `not-found.tsx` page is implemented to handle non-existent routes.
- **Server-Side Rendering (SSR)**: Core data is pre-fetched on the server using `prefetchQuery` for faster initial page loads and better SEO.

### 🚀 What Was Learned and Implemented

This development stage focused on learning and implementing advanced routing techniques in Next.js:

1.  **Catch-all Routes (`[...slug]`)**: A dynamic route was created to "catch" all filtering requests, enabling a single logic to handle both `/notes/filter/All` and `/notes/filter/Work`.
2.  **Parallel Routes (`@slot`)**: Implemented parallel rendering of two independent UI parts—the sidebar (`@sidebar`) and the main content (`children`)—within the same layout, allowing them to be updated separately.
3.  **Intercepting Routes (`(..)` syntax)**: Configured interception for the `/notes/[id]` route. Instead of navigating to a new page, the user sees a modal with note details while remaining on the current list page, creating an SPA-like experience.
4.  **Layout Organization**: Built a nested layout structure for different routing levels, ensuring flexibility and UI reusability.

---

### 📂 Project Structure

The project is organized according to Next.js App Router conventions for a clear separation of server and client logic.

```
/
├── app/
│   ├── layout.tsx                # Global layout (Header, Footer)
│   ├── page.tsx                  # Home page ("/")
│   ├── not-found.tsx             # 404 page
│   └── notes/
│       ├── [id]/                 # Real route for note details (for F5, direct links)
│       │   └── page.tsx
│       └── filter/
│           ├── [...slug]/        # (children) Main content (notes list)
│           │   └── page.tsx
│           ├── @modal/(..)notes/[id]/ # Interceptor for the modal window
│           │   └── page.tsx
│           ├── @sidebar/         # Parallel slot for the sidebar
│           │   └── [...slug]/
│           │       └── page.tsx
│           └── layout.tsx        # Layout that combines @sidebar and children
├── components/                   # Reusable client components
├── lib/
│   └── api.ts                    # Functions for the REST API
└── types/
    └── note.ts
```

---

### 🚀 Installation and Setup

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd 07-routing-nextjs
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env.local` in the project root and add your token:

    ```
    NEXT_PUBLIC_NOTEHUB_TOKEN=your_api_token_here
    ```

4.  **Run the project:**

    ```bash
    npm run dev
    ```

    The application will be available at [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000).
