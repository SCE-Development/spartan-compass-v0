<script lang="ts">
	let { data } = $props();
	let { professors } = $derived(data);
</script>

<div class="overflow-hidden px-2">
	<div class="-mx-2 -mb-4 flex flex-wrap">
		{#each professors as professor}
			<div class="mb-4 w-full border-2 px-2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6">
				<a href={`/professors/${professor.name.split(' ').join('-')}`}>{professor.name}</a>
			</div>
		{/each}
	</div>
</div>
