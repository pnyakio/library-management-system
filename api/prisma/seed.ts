import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const fiction = await prisma.genre.upsert({
    where: { slug: "fiction" },
    update: {},
    create: { name: "Fiction", slug: "fiction" },
  });

  const technology = await prisma.genre.upsert({
    where: { slug: "technology" },
    update: {},
    create: { name: "Technology", slug: "technology" },
  });

  const science = await prisma.genre.upsert({
    where: { slug: "science" },
    update: {},
    create: { name: "Science", slug: "science" },
  });

  const history = await prisma.genre.upsert({
    where: { slug: "history" },
    update: {},
    create: { name: "History", slug: "history" },
  });

    const books = [
    // Fiction
    { title: "Things Fall Apart", author: "Chinua Achebe", isbn: "9780385474542", genreId: fiction.id },
    { title: "Purple Hibiscus", author: "Chimamanda Ngozi Adichie", isbn: "9781616202415", genreId: fiction.id },
    { title: "The River Between", author: "Ngugi wa Thiong'o", isbn: "9780435905484", genreId: fiction.id },
    { title: "The Alchemist", author: "Paulo Coelho", isbn: "9780061122415", genreId: fiction.id },

    // Technology
    { title: "Clean Code", author: "Robert C. Martin", isbn: "9780132350884", genreId: technology.id },
    { title: "The Pragmatic Programmer", author: "David Thomas and Andrew Hunt", isbn: "9780135957059", genreId: technology.id },
    { title: "You Don't Know JS", author: "Kyle Simpson", isbn: "9781491924464", genreId: technology.id },
    { title: "Eloquent JavaScript", author: "Marijn Haverbeke", isbn: "9781593279509", genreId: technology.id },

    // Science
    { title: "A Brief History of Time", author: "Stephen Hawking", isbn: "9780553380163", genreId: science.id },
    { title: "The Selfish Gene", author: "Richard Dawkins", isbn: "9780198788607", genreId: science.id },
    { title: "Cosmos", author: "Carl Sagan", isbn: "9780345539434", genreId: science.id },

    // History
    { title: "A History of Kenya", author: "William Robert Ochieng", isbn: "9780435948109", genreId: history.id },
    { title: "The Wretched of the Earth", author: "Frantz Fanon", isbn: "9780802141323", genreId: history.id },
    { title: "Long Walk to Freedom", author: "Nelson Mandela", isbn: "9780316548182", genreId: history.id },
    { title: "The Guns of August", author: "Barbara W. Tuchman", isbn: "9780345476098", genreId: history.id },
  ];

  for (const book of books) {
    await prisma.book.upsert({
      where: { isbn: book.isbn },
      update: {},
      create: book,
    });
  }
}

main()
  .catch((error) => {
    console.error("Error seeding database:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });