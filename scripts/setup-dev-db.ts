
import { initDb } from '../lib/schema';
import { getDb } from '../lib/db';

async function main() {
    try {
        console.log('Initializing database schema...');
        await initDb();
        console.log('Database initialized successfully.');

        // Verify by listing tables
        const db = getDb();
        const result = await db.execute("SELECT name FROM sqlite_master WHERE type='table'");
        console.log('Tables created:', result.rows.map(r => r.name));
    } catch (error) {
        console.error('Failed to initialize database:', error);
        process.exit(1);
    }
}

main();
