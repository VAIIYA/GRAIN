import { db } from './db';

export async function initDb() {
    await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      profile_image TEXT,
      bio TEXT
    )
  `);

    await db.execute(`
    CREATE TABLE IF NOT EXISTS pins (
      id TEXT PRIMARY KEY,
      owner_id TEXT NOT NULL,
      image_url TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (owner_id) REFERENCES users(id)
    )
  `);

    await db.execute(`
    CREATE TABLE IF NOT EXISTS likes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      pin_id TEXT NOT NULL,
      UNIQUE(user_id, pin_id),
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (pin_id) REFERENCES pins(id)
    )
  `);

    await db.execute(`
    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      pin_id TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (pin_id) REFERENCES pins(id)
    )
  `);
}
