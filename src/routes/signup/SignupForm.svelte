<script lang="ts">
  import { goto } from "$app/navigation";
    import { poiService } from "$lib/services/poi-service";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";
  import UserDetails from "$lib/ui/UserDetails.svelte";
  

  let firstName = $state("");
  let lastName = $state("");
  let email = $state("");
  let password = $state("");

 
  // the Signup checks in with the signup function in poiService and attempts to add the user to the store.
  // My function allows the user to be added however the goto login does not work.

  async function signup() {
    console.log(`attemmpting to create user ${firstName}, ${lastName}, ${email}, ${password}`);
    let success = await poiService.signup({ firstName, lastName, email, password });
    
    if (success) {
      goto("/login");
    } 
  }
</script>

<div class="box">
  
  <UserDetails bind:firstName bind:lastName />
  <UserCredentials bind:email bind:password />
  <button onclick={() => signup()}  class="button">Sign Up</button>
  <p class="has-text-centered">
    Already have an account? <a href="/login" data-cy="login-redirect">Login Here</a>
  </p>
</div>