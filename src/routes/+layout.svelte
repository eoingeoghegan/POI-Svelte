<script lang="ts">
  import { browser } from "$app/environment";
  import { loggedInUser } from "$lib/runes.svelte";
  import Heading from "$lib/ui/Heading.svelte";
  import Menu from "$lib/ui/Menu.svelte";
  import {poiService} from "$lib/services/poi-service";
  import { onMount } from "svelte";

  onMount(async () => {
    await poiService.restoreSession();
  });

</script>

<div class="container">
  {#if loggedInUser.email}
    <Menu />
    <Heading />
  {/if}
  <slot />
</div>
