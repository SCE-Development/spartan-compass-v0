import { db } from '$lib/db/db.server';
import { professorsTable } from '$lib/db/schema';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const professors = await db
    .select()
    .from(professorsTable)
    .orderBy(professorsTable.name)

    if (professors.length === 0) {
      return {
        status: 404,
        error: new Error('No professors found')
      }
    }

    return {
      professors
    }
}