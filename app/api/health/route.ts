import { getDb } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Testing database connection...');
    console.log('TURSO_DATABASE_URL exists:', !!process.env.TURSO_DATABASE_URL);
    console.log('TURSO_AUTH_TOKEN exists:', !!process.env.TURSO_AUTH_TOKEN);
    
    const db = getDb();
    
    // Test a simple query
    const result = await db.execute({
      sql: 'SELECT 1 as test',
      args: []
    });
    
    console.log('Database test successful:', result.rows);
    
    return NextResponse.json({ 
      status: 'ok', 
      database: 'connected',
      test: result.rows[0]
    });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json({ 
      status: 'error', 
      message: error instanceof Error ? error.message : 'Unknown error',
      env_vars_set: {
        url: !!process.env.TURSO_DATABASE_URL,
        token: !!process.env.TURSO_AUTH_TOKEN
      }
    }, { status: 500 });
  }
}
