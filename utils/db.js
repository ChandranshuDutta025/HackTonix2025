import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema.js'; // Ensure this path is correct


const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql,{schema});

const result = await db.execute('select 1');
