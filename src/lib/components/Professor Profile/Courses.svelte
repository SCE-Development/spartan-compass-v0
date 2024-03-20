<script lang="ts">
	import { professorsCoursesRelations } from "$lib/db/schema";

  import ClassCard from "./ClassCard.svelte";

  interface ExtendedCourse {
    id: number;
    title: string;
    subject: string;
    courseNumber: number;
    description: string | null;
    averageRating?: number; 
  }

  let { courses }: { courses: ExtendedCourse[]} = $props();
</script>

<div class="flex flex-wrap px-2">
  {#each courses as course}
  <div class="w-full sm:w-1/2 xl:w-1/3 mb-4 px-2">
    <ClassCard course={course} />
  </div>
  {/each}
</div>


