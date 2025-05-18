<script lang="ts">
  import {loggedInUser, subTitle} from "$lib/runes.svelte";
  import {poiService} from "$lib/services/poi-service";
  import {onMount} from "svelte";
  import type { Category, Placemarker } from "$lib/types/poi-types";
  import PlacemarkerForm from "./PlacemarkerForm.svelte";
  import PlacemarkerReport from "$lib/ui/PlacemarkerReport.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import Charts from "$lib/ui/Charts.svelte";


  /* This fetches a list of categories when the component 
   mounts and passes that list as a prop to a child component called <PlacemarkerForm>. 

   This allows for the list of placemarkers and the add placemarker form to exist on same page,
   Allows to for the Leaflet map to be displayed.
  */
  subTitle.text = "Dashboard";
  let categoryList: Category[]= [];
  let placemarkerReport: Placemarker[] =[];

  let map: LeafletMap;

  function placemarkerCreated(placemarker:Placemarker) {
    map.addMarker(placemarker.lat, placemarker.long, "");
    map.moveTo(placemarker.lat, placemarker.long);
  }

  onMount(async () => {
    categoryList = await poiService.getCategories(loggedInUser.token);
    placemarkerReport = await poiService.getPlacemarkers(loggedInUser.token)
    console.log("yo getting categories:", categoryList); // Checking if its working on console
    console.log(placemarkerReport)

    const placemarkers = await poiService.getPlacemarkers(loggedInUser.token);
    placemarkers.forEach((placemarker: Placemarker) => {
      if (typeof placemarker.categoryid !== "string") {
        const popup = `${placemarker.title}`;
        map.addMarker(placemarker.lat, placemarker.long, popup);
      }
    });
    const lastPlacemarker = placemarkers[placemarkers.length - 1];
    if (lastPlacemarker) map.moveTo(lastPlacemarker.lat, lastPlacemarker.long);
  });
 
</script>


<div class="columns card">
  <div class="column">
    <LeafletMap height={90} bind:this={map} />
  </div>
  <div class=" column">
   <Charts />
  </div>
</div>
<div class="columns card">
  <div class=" column">
    <PlacemarkerForm placemarkerEvent={placemarkerCreated} />
  </div>
  <div class="column">
     <PlacemarkerReport />
  </div>
</div>


