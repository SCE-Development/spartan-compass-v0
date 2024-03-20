<script lang="ts">
	interface Professor {
		id: number;
		name: string;
		department: string;
	}

	let { professors }: { professors: Professor[] } = $props();
</script>

<div class="overflow-x-auto">
	<table class="table">
		<!-- head -->
		<thead>
			<tr>
				<th></th>
				<th>Name</th>
				<th>Department</th>
			</tr>
		</thead>
		<tbody>
			{#each professors as professor, i}
				<tr>
					<th>{i + 1}</th>
					<td>{professor.name}</td>
					<td>{professor.department}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
