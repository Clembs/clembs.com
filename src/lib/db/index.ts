import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { POSTGRES_URL } from '$env/static/private';
import * as schema from './schema';

const connectionString = POSTGRES_URL;
const client = postgres(connectionString);

export const db = drizzle(client, { schema });
