import type { Config } from 'drizzle-kit';
import 'dotenv/config';

export default {
	schema: './src/lib/db/schema.ts',
	out: './src/lib/db/migrations',
	driver: 'pg',
	dbCredentials: {
		connectionString: process.env.POSTGRES_URL!,
	},
} satisfies Config;
