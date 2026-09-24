const Database = require("better-sqlite3");
const bcrypt = require("bcryptjs");
const path = require("path");

const db = new Database(path.join(process.cwd(), "dev.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    password TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'customer',
    createdAt TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

function upsert(name, email, password, role) {
  const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
  if (existing) {
    console.log(`- ${email} already exists, skipping`);
    return;
  }
  const hash = bcrypt.hashSync(password, 10);
  db.prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)").run(name, email, hash, role);
  console.log(`✓ created ${role}: ${email} / ${password}`);
}

upsert("Digifted Admin", "admin@digiftedhub.com", "ChangeMe123!", "admin");
upsert("Digifted Staff", "staff@digiftedhub.com", "ChangeMe123!", "staff");

console.log("\nDone. Change these passwords after first login.");
