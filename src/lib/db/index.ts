import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { SUPABASE_URL } from '$env/static/private';
import * as schema from './schema';

const connectionString = SUPABASE_URL;
const client = postgres(connectionString);

export const db = drizzle(client, { schema });
