<script lang="ts">
	import { professorsCoursesRelations } from "$lib/db/schema";

  import ClassCard from "./ClassCard.svelte";

  interface Course {
    id: number;
    title: string;
    subject: string;
    courseNumber: number;
    description: string | null;
  }

  let { courses } = $props<{ courses: Course[] }>();
</script>

<div class="flex flex-wrap px-2">
  {#each courses as course}
  <div class="w-full sm:w-1/2 xl:w-1/3 mb-4 px-2">
    <ClassCard course={course} />
  </div>
  {/each}
</div>


