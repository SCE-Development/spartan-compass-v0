import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";

import { db } from '$lib/db/db.server';
import { userTable, sessionTable } from '$lib/db/schema';

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);  




