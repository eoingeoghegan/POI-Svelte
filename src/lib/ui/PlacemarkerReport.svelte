<script lang="ts">
  
  import { poiService } from "$lib/services/poi-service";
  import {loggedInUser } from "$lib/runes.svelte";
  import { currentPlacemarkers } from "$lib/runes.svelte";

 // let {placemarkerReport} = $props();
   
  /* 
  remove function works by deleting a placemarker by its ID.
   it works by checking the poiService deleteplacemarker and passing the placemarkerId + loggedInUser.
   if success (removes) then it filters out the deleted placemarker.
   */ 
 
 
  async function remove(placemarkerId: string) {
  console.log("Deleting placemarker with ID:", placemarkerId); // Checking console to see if its working.
  const success = await poiService.deletePlacemarker(placemarkerId, loggedInUser.token);
  
  if (success) {
    console.log("Placemarker deleted successfully");
    currentPlacemarkers.placemarkers = currentPlacemarkers.placemarkers.filter(
  (placemarker) => placemarker._id !== placemarkerId
);
  } else {
    console.log("Error deleting placemarker");
  }
} 
</script>

<table class="table is-fullwidth">
  <thead>
    <tr>
      <th>Title</th>
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
  {#if placemarker.categoryid && typeof placemarker.categoryid === 'object'}
    {placemarker.categoryid.title}
  {:else}
    {placemarker.categoryid}
  {/if}
</td>
        <td>
          {placemarker.lat}
        </td>
        <td>
          {placemarker.long} 
        </td>
        <td>{placemarker.difficulty}</td>
        <td><button onclick={() => remove(placemarker._id) } class="button">Delete</button></td>
      </tr>
    {/each}
  </tbody>
</table>
