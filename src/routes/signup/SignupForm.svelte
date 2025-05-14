<script lang="ts">
  import { goto } from "$app/navigation";
    import { poiService } from "$lib/services/poi-service";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";
  import UserDetails from "$lib/ui/UserDetails.svelte";

  let firstName = $state("");
  let lastName = $state("");
  let email = $state("");
  let password = $state("");

 
  

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