<script lang="ts">
	import ProfessorCard from './ProfessorCard.svelte';

	interface ExtendedProfessor {
		id: number;
		name: string;
		averageRating: number;
	}

	let { professors }: { professors: ExtendedProfessor[] } = $props();
</script>

<div class="flex w-full flex-wrap px-2">
	{#each professors as professor}
		<div class="mb-4 w-full px-2 md:w-1/2 xl:w-1/3">
			<ProfessorCard {professor} />
		</div>
	{/each}
</div>
