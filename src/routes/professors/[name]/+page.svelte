<script lang="ts">
  import Courses from "$lib/components/Professor Profile/Courses.svelte";
  import Avatar from "$lib/components/Professor Profile/Avatar.svelte";

  let { data } = $props();

</script>

<Avatar professor={data.professor}/>
<Courses courses={data.courses}/>