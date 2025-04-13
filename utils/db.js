import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema.js';

// Check for database URL
if (!process.env.NEXT_PUBLIC_DRIZZLE_DB_URL) {
  throw new Error('No database connection string was provided to `neon()`.');
}

// Initialize the database connection
const sql = neon(process.env.NEXT_PUBLIC_DRIZZLE_DB_URL);
export const db = drizzle(sql, { schema });