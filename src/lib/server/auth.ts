import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";

import { db } from '$lib/db/db.server';
import { users, sessions } from '$lib/db/schema';

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);  




