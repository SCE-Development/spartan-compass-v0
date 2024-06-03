<script lang="ts">
	import CourseAvatar from '$lib/components/Course Page/CourseAvatar.svelte';
	import Professors from '$lib/components/Course Page/Professors.svelte';
	let { data } = $props();
	let course = $derived(data.courseData);
	let professors = $derived(data.professorsWithAverageRatings);
</script>

<div class="flex flex-col items-center w-full p-4 mx-auto max-w-[90rem]">
	<CourseAvatar {course} />
	<div class="w-full">
		{#if professors.length === 0}
			<div class="w-full shadow-xl card bg-base-300">
				<div class="card-body">
					<div class="flex justify-center text-center">
						<p class="text-2xl text-gray-400">No professors yet</p>
					</div>
				</div>
			</div>
		{:else}
			<h2 class="my-4 ml-8 text-3xl font-semibold">
				{professors?.length}
				{professors?.length === 1 ? 'Professor' : 'Professors'}
			</h2>
			<Professors {professors} />
		{/if}
	</div>
</div>
