'use server';

import { db } from './db';
import { v4 as uuidv4 } from 'uuid';

export async function savePin(data: {
    owner_id: string; // wallet address
    image_url: string;
    title: string;
    description?: string;
    price: number;
    hashtags?: string[];
}) {
    const id = uuidv4();

    // Ensure user exists first
    await db.execute({
        sql: `INSERT OR IGNORE INTO users (id, wallet_address) VALUES (?, ?)`,
        args: [data.owner_id, data.owner_id],
    });

    await db.execute({
        sql: `INSERT INTO pins (id, owner_id, image_url, title, description, price) 
          VALUES (?, ?, ?, ?, ?, ?)`,
        args: [id, data.owner_id, data.image_url, data.title, data.description || '', data.price],
    });

    if (data.hashtags && data.hashtags.length > 0) {
        for (const tag of data.hashtags.slice(0, 5)) {
            const cleanTag = tag.replace('#', '').toLowerCase().trim();
            if (!cleanTag) continue;

            await db.execute({
                sql: `INSERT OR IGNORE INTO hashtags (name) VALUES (?)`,
                args: [cleanTag],
            });

            const hashtagResult = await db.execute({
                sql: `SELECT id FROM hashtags WHERE name = ?`,
                args: [cleanTag],
            });

            if (hashtagResult.rows.length > 0) {
                await db.execute({
                    sql: `INSERT OR IGNORE INTO pin_hashtags (pin_id, hashtag_id) VALUES (?, ?)`,
                    args: [id, Number(hashtagResult.rows[0].id)],
                });
            }
        }
    }

    return { id };
}

export async function unlockPin(walletAddress: string, pinId: string) {
    await db.execute({
        sql: `INSERT OR IGNORE INTO unlocks (user_id, pin_id) VALUES (?, ?)`,
        args: [walletAddress, pinId],
    });
}

export async function getPins(options: {
    search?: string;
    limit?: number;
    offset?: number;
    walletAddress?: string;
}) {
    const { search, limit = 20, offset = 0, walletAddress } = options;

    let query = `
        SELECT p.*, u.username as owner_name, u.profile_image as owner_image,
        EXISTS(SELECT 1 FROM unlocks un WHERE un.pin_id = p.id AND un.user_id = ?) as isUnlocked
        FROM pins p
        JOIN users u ON p.owner_id = u.wallet_address
    `;
    const args: any[] = [walletAddress || ''];

    if (search) {
        query += `
            WHERE p.title LIKE ? 
            OR p.id IN (
                SELECT ph.pin_id 
                FROM pin_hashtags ph 
                JOIN hashtags h ON ph.hashtag_id = h.id 
                WHERE h.name LIKE ?
            )
        `;
        args.push(`%${search}%`, `%${search}%`);
    }

    query += ` ORDER BY p.created_at DESC LIMIT ? OFFSET ?`;
    args.push(limit, offset);

    const result = await db.execute({ sql: query, args });
    return result.rows;
}
