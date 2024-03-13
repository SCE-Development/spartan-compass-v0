<script lang="ts">
  import { enhance } from "$app/forms";
  

</script>

<form method="POST" action="?/logout" use:enhance class="flex justify-center m-32">
  <button class="btn" type="submit" name="action" value="logout">Log Out</button>
</form>