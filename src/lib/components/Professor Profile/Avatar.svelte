<script lang="ts">
  interface Professor {
    id: number;
    name: string;
    department: string;
  }

  let { professor } = $props<{ professor: Professor }>();
  const initials: string = professor.name.split(' ').map((n) => n[0]).join('');
</script>

<div class="flex justify-center items-center rounded m-4">
  <div class="flex w-full items-center overflow-hidden rounded-lg bg-zinc-300 px-8 py-6">
    <div class="avatar placeholder mr-6">
      <div class="bg-neutral text-neutral-content rounded-full w-24">
        <span class="text-3xl text-gray-300">{initials}</span>
      </div>
    </div> 
    <div class="flex-col justify-center">
      <p class="badge rounded-md px-2 py-3">{professor.department}</p>
      <div class="font-bold text-2xl mt-1 text-neutral">{professor.name}</div>
    </div>
  </div>
</div>
