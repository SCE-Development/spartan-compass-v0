<script lang="ts">
  interface Professor {
    id: number;
    name: string;
    department: string;
  }

  interface Course {
    id: number;
    title: string;
    subject: string;
    courseNumber: number;
    description: string | null;
  }

  let { professor, course } = $props();

  const initials: string = professor.name.split(' ').map((n) => n[0]).join('');
</script>

<div class="flex justify-center items-center mb-4 w-full bg-zinc-300">
  <div class="flex w-full items-center overflow-hidden rounded-lg px-8 py-6">
    <div class="avatar placeholder mr-6">
      <div class="bg-base-100 text-neutral-content rounded-full w-24">
        <span class="text-3xl text-gray-300">{initials}</span>
      </div>
    </div> 
    <div class="flex-col justify-center mr-6">
      <p class="badge rounded-md px-2 py-3">{professor.department}</p>
      <div class="font-bold text-2xl mt-1 text-neutral">{professor.name}</div>
    </div>

    {#if course}
      <div class="mr-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevrons-right text-base-100"><path d="m6 17 5-5-5-5"/><path d="m13 17 5-5-5-5"/></svg>              
      </div>
      <div class="flex-col justify-center">
        <p class="badge rounded-md px-2 py-3">{course.subject}-{course.courseNumber}</p>
        <div class="font-bold text-2xl mt-1 text-neutral">{course.title}</div>
      </div>
    {/if}

  </div>
</div>

