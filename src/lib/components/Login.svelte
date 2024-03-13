<script lang="ts">
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  
  const login = () => {
    goto("/auth");
  };
</script>

<form on:submit|preventDefault={login} class="flex justify-center m-32" use:enhance>
  <button class="btn" type="submit">Sign in with Google</button>
</form>