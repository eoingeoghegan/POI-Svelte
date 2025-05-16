<script lang="ts">
    import { loggedInUser, subTitle } from "$lib/runes.svelte";
    import { poiService } from "$lib/services/poi-service";
    import type { Placemarker } from "$lib/types/poi-types";
    import LeafletMap from "$lib/ui/LeafletMap.svelte";
    import { onMount } from "svelte";
  
    subTitle.text = "POI Geo Data";
    let map: LeafletMap;
  
    onMount(async () => {
      const placemarkers = await poiService.getPlacemarkers(loggedInUser.token);
      placemarkers.forEach((placemarker: Placemarker) => {
      if(typeof placemarker.categoryid !=="string") {
        const popup = `${placemarker.title}`;
        map.addMarker(placemarker.lat, placemarker.long, popup);
      }
      });
      const lastPlacemarker = placemarkers[placemarkers.length - 1];
    if (lastPlacemarker) map.moveTo(lastPlacemarker.lat, lastPlacemarker.long);
    });
  </script>
  
  <div class="card">
    <LeafletMap height={60} bind:this={map} />
  </div>
  