<script lang="ts">
    import { goto } from "$app/navigation";
    import { loggedInUser } from "$lib/runes.svelte";
    import { poiService } from "$lib/services/poi-service";
    

    poiService.clearSession();  //clear local storage
    goto("/");
  </script>
  