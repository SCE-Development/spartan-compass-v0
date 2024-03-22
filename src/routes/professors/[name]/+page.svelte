<script lang="ts">
  import Courses from "$lib/components/Professor Profile/Courses.svelte";
  import Avatar from "$lib/components/Professor Profile/Avatar.svelte";
  import ReviewCard from "$lib/components/Professor Profile/ReviewCard.svelte";

  let { data } = $props();
  let { ratings } = $derived(data);
</script>

<div class="flex flex-col w-full items-center">
  <Avatar avatarProps={data} />
  <div class="xl:w-3/4">
    <h2 class="text-2xl font-semibold ml-8 my-4">{data.courses?.length} Courses</h2>
    <Courses courses={data.courses}/>
    <h2 class="text-2xl font-semibold ml-8 my-4">{ratings?.length} Reviews</h2>
    <div class="flex flex-wrap px-2">
      {#each ratings as review}
      <div class="w-full mb-4 px-2">
        <ReviewCard review={review} />
      </div>
      {/each}
    </div>
  </div>
  
</div>