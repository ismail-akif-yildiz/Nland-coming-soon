// src/lib/db.ts
import "server-only"; // ← Bu önemli: sadece server
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const dbPath = path.join(dataDir, "subscribers.db");
const db = new Database(dbPath);

// Performans/sağlamlık
db.pragma("journal_mode = WAL");

// Tablo
db.exec(`
  CREATE TABLE IF NOT EXISTS subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    ip TEXT,
    user_agent TEXT,
    created_at TEXT NOT NULL
  );
`);

export default db;
