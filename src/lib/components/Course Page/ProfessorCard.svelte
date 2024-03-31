<script lang="ts">
	import { goto } from '$app/navigation';

	interface Professor {
		id: number;
		name: string;
		averageRating: number;
	}

	let { professor }: { professor: Professor } = $props();
	let [firstName, ...rest] = professor.name.split(' ');
	let lastName = rest.pop() || firstName;
	let professorNameRoute = `${firstName}-${lastName}`;
</script>

<div class="card w-full bg-base-300 shadow-xl">
	<div class="card-body">
		<div class="flex items-center justify-between text-center">
			<div>
				<div class="flex-col text-2xl font-semibold">
					<p>{firstName}</p>
					<p>{lastName}</p>
				</div>
			</div>

			<div>
				<div class="mb-2 flex h-24 items-center justify-center rounded-md border-2">
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
