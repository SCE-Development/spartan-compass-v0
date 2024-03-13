<script lang="ts">
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  
  const login = () => {
    goto("/auth");
  };
</script>

<form on:submit|preventDefault={login}>
  <button class="btn" type="submit">Sign in</button>
</form>