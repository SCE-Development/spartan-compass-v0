<script lang='ts'>
  interface Professor {
    id: number;
    name: string;
    department: string;
  }

  let { data } = $props();
  const professors = data.professors;
</script>

<ul>
  {#each professors as professor}
    <li>
      <a href={`/professor/${professor.name}`}>{professor.name}</a>
    </li>
  {/each}
</ul>