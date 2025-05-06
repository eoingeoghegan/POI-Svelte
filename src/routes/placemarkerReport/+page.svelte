<script lang="ts">
    import PlacemarkerReport from "$lib/ui/PlacemarkerReport.svelte";
    import {loggedInUser,subTitle} from "$lib/runes.svelte";
    import { poiService } from "$lib/services/poi-service";
    import { onMount } from "svelte";
    import type { Placemarker} from "$lib/types/poi-types";
  
    subTitle.text = "Reports So Far";
    let placemarkerReport: Placemarker [] = [];
    
    onMount(async () => {
      placemarkerReport = await poiService.getPlacemarkers(loggedInUser.token)
    });
  
  </script>
  
  <PlacemarkerReport  />