<script lang="ts">
	import { goto } from '$app/navigation';

	interface Professor {
		id: number;
		name: string;
		averageRating: number;
	}

	let { professor }: { professor: Professor } = $props();
	let professorName = professor.name.split(' ');
	let professorNameRoute: string;
	if (professorName.length > 1) {
		professorNameRoute = `${professorName[0]}-${professorName[professorName.length - 1]}`;
	} else {
		professorNameRoute = professorName[0];
	}
</script>

<div class="card w-full bg-base-300 shadow-xl">
	<div class="card-body">
		<div class="flex items-center justify-between">
			<div>
				<div class="text-2xl font-semibold flex-col text-center">
					<p>{professorName[0]}</p>
					<p>{professorName[1]}</p>
				</div>
			</div>

			<div class="ml-5">
				<div class="mb-2 flex h-16 items-center justify-center rounded-md border-2">
					<span class="text-4xl">
						{professor.averageRating ? professor.averageRating : 'N/A'}
					</span>
				</div>
				<button
					class="btn btn-secondary btn-sm"
					on:click={() => {
						goto(`/professors/${professorNameRoute}`);
					}}
				>
					Reviews
				</button>
			</div>
		</div>
	</div>
</div>
