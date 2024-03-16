<script lang="ts">
	import { professorsCoursesRelations } from "$lib/db/schema";

  interface Course {
    id: number;
    title: string;
    subject: string;
    courseNumber: number;
    description: string | null;
  }

  let { courses } = $props<{ courses: Course[] }>();
</script>
<main class="flex justify-center w-full px-6 py-4">
  <div class="overflow-x-auto w-4/5">
    <table class="table">
      <thead>
        <tr>
          <th>Course Number</th>
          <th>Course Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {#each courses as course, i}
          <tr>
            <td>{course.subject}-{course.courseNumber}</td>
            <td>{course.title}</td>
            <td>{course.description}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</main>
