# Library Management System

A Library Management System built with NestJS, Prisma, and PostgreSQL.

## Project Overview

This project establishes the database foundation for managing library users, book collections, and book genres.

## Technology Stack

- **Backend:** NestJS
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Language:** TypeScript

## Database Schema

The database currently contains three main models:

- **User:** Stores user information, including name, email, and role.
- **Genre:** Stores book genre information.
- **Book:** Stores book details and connects each book to a genre.

The `Role` enum defines two user roles:

- `PATRON`
- `LIBRARIAN`

## Schema Decisions

The `Book` model references the `Genre` model through a `genreId` foreign key instead of embedding the genre information directly inside each book record.

This relational approach was chosen because:

1. **Reduces data duplication:** Multiple books can belong to the same genre without repeating the genre name in every book record.
2. **Maintains consistency:** If a genre name changes, it only needs to be updated once in the `Genre` table.
3. **Supports relationships:** The foreign key connects each book to an existing genre and helps maintain referential integrity.
4. **Makes querying easier:** Books can be retrieved and grouped by genre through the relationship.

The one-to-many relationship allows one genre to have multiple books, while each book references one genre.

## Database Seeding

The database is populated with initial sample data using Prisma's seed script.

The seed includes:

- 4 genres: Fiction, Technology, Science, and History.
- 15 books distributed across the four genres.

The seed script uses `upsert` operations to avoid creating duplicate genres and books when it is run again.

## Environment Configuration

The API uses a PostgreSQL connection string stored in an environment variable named `DATABASE_URL`.

Create an `.env` file inside the `api` directory and configure your own database connection string.

The `.env.example` file provides a placeholder showing the required variable. Do not commit real database credentials.

## Project Structure

```text
library-management-system/
├── api/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── seed.ts
│   ├── src/
│   │   └── prisma/
│   │       └── prisma.service.ts
│   ├── .env.example
│   └── prisma7.config.ts
└── README.md

