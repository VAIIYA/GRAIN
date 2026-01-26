import { db } from './db';

export async function initDb() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      wallet_address TEXT UNIQUE NOT NULL,
      username TEXT UNIQUE,
      profile_image TEXT,
      bio TEXT,
      is_subscribed BOOLEAN DEFAULT 0,
      subscription_expiry DATETIME
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS pins (
      id TEXT PRIMARY KEY,
      owner_id TEXT NOT NULL,
      image_url TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      price DECIMAL(10, 2) DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (owner_id) REFERENCES users(id)
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS hashtags (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS pin_hashtags (
      pin_id TEXT NOT NULL,
      hashtag_id INTEGER NOT NULL,
      PRIMARY KEY (pin_id, hashtag_id),
      FOREIGN KEY (pin_id) REFERENCES pins(id),
      FOREIGN KEY (hashtag_id) REFERENCES hashtags(id)
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS unlocks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      pin_id TEXT NOT NULL,
      UNIQUE(user_id, pin_id),
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (pin_id) REFERENCES pins(id)
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
