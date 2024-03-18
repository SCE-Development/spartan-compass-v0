<script lang='ts'>
  interface Professor {
    id: number;
    name: string;
    department: string;
  }

  let { data } = $props();
  const professors = data.professors;
</script>

<div class="px-2 overflow-hidden">
  <div class="flex flex-wrap -mx-2 -mb-4">
    {#each professors as professor}
      <div class="w-full border-2 px-2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4">
        <a href={`/professors/${professor.name.split(' ').join('-')}`}>{professor.name}</a>
      </div>
    {/each}
  </div>
</div>
