import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "dev.db");
const db = new Database(dbPath);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    password TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'customer', -- customer | staff | admin
    createdAt TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS galleries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    department TEXT,
    description TEXT,
    coverImage TEXT,
    price INTEGER,
    password TEXT,
    isForSale INTEGER NOT NULL DEFAULT 0,
    isPublic INTEGER NOT NULL DEFAULT 0,
    createdById INTEGER REFERENCES users(id),
    createdAt TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS media (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    galleryId INTEGER NOT NULL REFERENCES galleries(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    cloudinaryId TEXT NOT NULL,
    url TEXT NOT NULL,
    thumbnailUrl TEXT,
    createdAt TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customerId INTEGER NOT NULL REFERENCES users(id),
    galleryId INTEGER NOT NULL REFERENCES galleries(id),
    status TEXT NOT NULL DEFAULT 'pending', -- pending | paid | failed
    total INTEGER NOT NULL,
    paymentReference TEXT UNIQUE,
    createdAt TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customerId INTEGER REFERENCES users(id),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    department TEXT,
    preferredDate TEXT,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    createdAt TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

export default db;
