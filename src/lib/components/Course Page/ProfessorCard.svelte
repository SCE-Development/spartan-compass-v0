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
				<div class="flex-col text-3xl font-semibold">
					<p>{firstName}</p>
					<p>{lastName}</p>
				</div>
			</div>

			<div>
				<p class="mx-1 mb-1 text-sm">Average Rating</p>
				<div class="mb-2 flex h-24 items-center justify-center rounded-md border-2">
					<span class="text-5xl">
						{professor.averageRating ? professor.averageRating : 'N/A'}
					</span>
				</div>
				<button
					class="btn btn-secondary btn-sm w-full"
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
