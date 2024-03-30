<script lang="ts">
	import Avatar from '$lib/components/Professor Profile/Avatar.svelte';
	import Reviews from '$lib/components/Professor Profile/Reviews.svelte';
	let { data } = $props();
</script>

<div class="flex w-full flex-col items-center">
	<Avatar professor={data.professor} courses={data.courses} showCourse={true} />
	<div class="xl:w-3/4">
		<h2 class="my-4 ml-8 text-3xl font-semibold">
			{data.ratings?.length}
			{data.ratings?.length === 1 ? 'Review' : 'Reviews'}
		</h2>
		<Reviews ratings={data.ratings} />
	</div>
</div>
