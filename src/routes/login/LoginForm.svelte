<script lang="ts">
  import {goto} from "$app/navigation";  
  import UserCredentials from "$lib/ui/UserCredentials.svelte";
  import {loggedInUser} from "$lib/runes.svelte";
  import { poiService } from "$lib/services/poi-service";

let email = $state("");
let password= $state("");

/*
Calls the login method from poiService, which sends a request to the backend with the credentials.
It then Awaits the response, if sucessful it will direct to the dashboard.
*/
async function login() {
    console.log(`attempting to log in email: ${email} with password: ${password}`);
    let session = await poiService.login(email, password);
    if (session) {
   
      goto("/dashboard");
    } else {
      email = "";
      password = "";
      
    }
  }
</script>

<div class = "box">
  <UserCredentials bind:email bind:password />
  <button onclick={() => login()} class="button is-info">Login</button>  
</div>