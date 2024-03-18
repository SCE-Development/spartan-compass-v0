<script lang='ts'>
  interface Professor {
    id: number;
    name: string;
    department: string;
  }

  let { data } = $props();
  const professors = data.professors;
</script>

<div class="flex flex-wrap justify-center">
  {#each professors as professor}
    <div class="w-full border-2 m-8 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4 bg-gray-500">
      <a href={`/professors/${professor.name}`}>{professor.name}</a>
    </div>
  {/each}
</div>