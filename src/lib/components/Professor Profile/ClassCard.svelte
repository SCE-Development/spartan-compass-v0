<script lang="ts">
  import { page } from "$app/stores";

  interface Course {
    id: number;
    title: string;
    subject: string;
    courseNumber: number;
    description: string | null;
  }

  let { course } = $props<{ course: Course }>();
</script>

<div class="card w-full bg-base-300 shadow-xl">
  <div class="card-body">
    
    <div class="flex justify-between items-center">
      <div>
        <div>
          <a href={`${$page.url.pathname}/${course.subject}-${course.courseNumber}`} class="text-lg font-semibold hover:underline">{course.subject}-{course.courseNumber}: {course.title}</a>
          <p class="text-gray-400">{course.description}</p>
        </div>
      </div>

      <div>
        <div class="flex justify-center items-center border-2 rounded-md h-16 mb-2">
          <span class="text-4xl">
            5.0
          </span>
        </div>
        <button class="btn btn-secondary btn-sm">
          Reviews
        </button>
      </div>

    </div>
    
  </div>
</div>
