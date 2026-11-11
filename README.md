# Цифровая визитка разработчика

Backend-визитка на TypeScript, NestJS, GraphQL, Prisma и PostgreSQL. Apollo Sandbox доступен по адресу `http://localhost:3000/graphql` после запуска приложения.

## Запуск с нуля

Требуются Docker и Docker Compose. В корне проекта выполните:

```sh
docker compose up --build
```

Compose запускает PostgreSQL и ждёт готовности базы. Контейнер приложения затем применяет Prisma-миграции, заполняет профиль и запускает API. Откройте `http://localhost:3000/graphql`; данные сохраняются в Docker volume `postgres_data`.

Чтобы остановить контейнеры, не удаляя данные:

```sh
docker compose down
```

## Локальный запуск без контейнера приложения

Нужны Node.js 24.15+ и Docker Compose. Скопируйте `.env.example` в `.env`, запустите PostgreSQL и подготовьте зависимости:

```sh
docker compose up -d postgres
npm ci
npm run start:local
```

`start:local` применяет миграции и сидирует профиль до запуска NestJS в watch-режиме. Для штатного старта без watch используйте `npm run build` и `npm start` после подготовки базы.

## GraphQL API

```graphql
query {
  profile {
    name
    description
    githubUrl
    linkedinUrl
    websiteUrl
    skills {
      name
    }
    experience {
      company
      position
      period
      achievements
    }
    projects {
      name
      description
      url
    }
  }
}
```

Это read-only API: визитка предназначена для публичного чтения, поэтому мутации и авторизация в тестовом не добавлены.

## Структура и решения

- `src/profile/profileResolver.ts` — GraphQL-граница: принимает запрос и передаёт его сервису.
- `src/profile/profileService.ts` — получает профиль и связи через `PrismaService`.
- `src/profile/profile.ts` — GraphQL-типы ответа отделены от Prisma-моделей.
- `src/prisma/` — единое подключение Prisma с жизненным циклом NestJS.
- `prisma/schema.prisma` — нормализованные таблицы профиля, навыков, опыта и проектов.
- `prisma/profileData.ts` и `prisma/seed.ts` — исходные данные визитки и повторяемое заполнение базы.
- `prisma/migrations/` — зафиксированная начальная миграция; запуск не зависит от `prisma db push`.

Связанные списки сортируются по сохранённому порядку. GraphQL-резолвер не делает отдельный запрос для каждого вложенного поля: сервис запрашивает весь профиль с отношениями в одном SQL-запросе через Prisma `relationLoadStrategy: 'join'`. Для небольшого публичного профиля это упрощает резолвер и исключает N+1-запросы.

Сидер — источник истины для публичных данных. Он идемпотентен и атомарно заменяет связанные списки при каждом запуске; редактируйте `prisma/profileData.ts`, а не базу вручную. Перед публикацией замените имя и описание, добавьте реальные ссылки, периоды и достижения в `experience`, укажите публичные ссылки проектов. Текущие значения ссылок пусты, опыт не выдуман, имя `Vlad` взято из локальной Git-конфигурации.

## Git

Проект предназначен для отдельного Git-репозитория. После проверки персональных данных создайте удалённый репозиторий и добавьте его как `origin`; удалённая публикация и деплой требуют ваших аккаунтов и URL.
