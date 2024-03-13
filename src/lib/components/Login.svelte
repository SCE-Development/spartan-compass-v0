<script lang="ts">
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  
  const login = () => {
    goto("/auth");
  };
</script>

<form method="POST" action="?/login" use:enhance class="flex justify-center m-32">
  <button class="btn" type="submit" name="action" value="login">Sign in with Google</button>
</form>