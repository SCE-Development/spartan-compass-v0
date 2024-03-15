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

<div class="overflow-x-auto">
  <table class="table">
    <thead>
      <tr>
        <th></th>
        <th>Course Number</th>
        <th>Course Name</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      {#each courses as course, i}
        <tr>
          <th>{i + 1}</th>
          <td>{course.subject}-{course.courseNumber}</td>
          <td>{course.title}</td>
          <td>{course.description}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>