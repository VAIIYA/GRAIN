import { createClient, Client } from '@libsql/client';

let db: Client | null = null;

export function getDb(): Client {
  if (!db) {
    const url = process.env.TURSO_DATABASE_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN;
    
    console.log('Initializing database client...');
    console.log('URL exists:', !!url);
    console.log('Token exists:', !!authToken);
    
    if (!url || !authToken) {
      throw new Error(
        'Database configuration missing. TURSO_DATABASE_URL or TURSO_AUTH_TOKEN not set.'
      );
    }
    
    try {
      db = createClient({
        url,
        authToken,
      });
      console.log('Database client created successfully');
    } catch (error) {
      console.error('Failed to create database client:', error);
      throw error;
    }
  }
  return db;
}
