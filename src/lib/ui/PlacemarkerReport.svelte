<script lang="ts">
  
  import { poiService } from "$lib/services/poi-service";
  import {loggedInUser } from "$lib/runes.svelte";
  import { currentPlacemarkers } from "$lib/runes.svelte";

 // let {placemarkerReport} = $props();
   
  /* remove function works by remove a placemarker by its ID.
   it works by checking the poiService deleteplacemarker and passing the placemarkerId + loggedInUser.
   if success (removes) then if filters out the deleted placemarker.
   */ 
 
 
 /*  async function remove(placemarkerId: string) {
  console.log("Deleting placemarker with ID:", placemarkerId); // Checking console to see if its working.
  const success = await poiService.deletePlacemarker(placemarkerId, loggedInUser.token);
  
  if (success) {
    console.log("Placemarker deleted successfully");
    placemarkerReport = placemarkerReport.filter((placemarker: { _id: string; }) => placemarker._id !== placemarkerId);
  } else {
    console.log("Error deleting placemarker");
  }
} 
 
<td><button onclick={() => remove(placemarker._id) } class="button">Delete</button></td>
 */
</script>

<table class="table is-fullwidth">
  <thead>
    <tr>
      <th>title</th>
      <th>Description</th>
      <th>Category</th>
      <th>Lat</th>
      <th>Long</th>
      <th>Difficulty</th>
    </tr>
  </thead>
  <tbody>
    {#each currentPlacemarkers.placemarkers as placemarker}
      <tr>
        <td>
          {placemarker.title}
        </td>
        <td>
          {placemarker.description}
        </td><td>
          {placemarker.categoryid.title}
        </td>
        <td>
          {placemarker.lat}
        </td>
        <td>
          {placemarker.long} 
        </td>
        <td>{placemarker.difficulty}</td>
        
      </tr>
    {/each}
  </tbody>
</table>
