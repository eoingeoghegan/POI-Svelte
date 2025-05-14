<script lang="ts">
  import {loggedInUser, currentCategories} from "$lib/runes.svelte";
  import { poiService } from "$lib/services/poi-service";
  import Coordinates from "$lib/ui/Coordinates.svelte";
  import type {Placemarker} from "$lib/types/poi-types";
  
  
  /*
    const categoryList = [
    {title: "Walks Easy"},
    
    {title: "Walks Hard"},
    
    {title: "Walks medium"}
  ]; 
  */

  let {categoryList = [] , placemarkerEvent = null } = $props();

  let title = $state("");
  let description = $state("");
  let selectedCategory = $state("");
  let difficulty =$state("");
  
  let lat = $state(4.222);
  let long =$state(-6.334);
  let img = "";
 

  
  

  /* addPlacemarker works by trying to create and submit a new placemarker. 
   The function checks that all values (category, title, description, 
   latitude, longitude, and difficulty) are provided. 
   
   It then searches through the list of categories to find one that matches the selected category ID.
   If the category exists it will build the placemarker. 
   
   It will then send the placeamrker to the poiService to try send it to the backend. */
   
    
  async function AddPlacemarker() {
    if (selectedCategory && title && description && lat && long && difficulty) {
      const category = currentCategories.categories.find((category) => category._id === selectedCategory);
      if (category) {
        const placemarker: Placemarker = {
          title: title,
          description: description,
          categoryid: category,
          lat: lat,
          long: long,
          difficulty: difficulty,
         
          

        };
        const success = await poiService.placemarker(placemarker, loggedInUser.token);
      if (!success) {
        console.log( " placemarker not added");
      }
      if (placemarkerEvent) placemarkerEvent(placemarker);
        console.log( `Adding Placemarker ${placemarker.title}`);
     } else {
        console.log(`Added: ${title} + description: ${description} to ${selectedCategory}`);
        console.log(`lat: ${lat}, long: ${long}`);
        title = "";
        description = "";
        selectedCategory = "";
        difficulty = "";
        lat = 4.222;
        long = -6.334;
        
      }}
      
     
      };
</script>

<div>
  <div class="field">
    <label class="label" for="title">Title</label>
    <input bind:value={title} class="input" placeholder="Enter Loction.." id="title" name="title" type="text" />
  </div>
  <div class="field">
    <div class="field">
      <label class="label" for="difficulty">Difficulty:</label>
      <input bind:value={difficulty} class="input" placeholder="Easy, Hard, Expert.." id="difficulty" name="difficulty" type="text" />
    </div>
  
    <div class="field">
      <label class="label" for="description">Description:</label>
      <input bind:value={description} class="input" placeholder="Describe the walk.." id="description" name="description" type="text" />
    </div>
  </div>
  
  <div class="field">
    <label class="label" for="category">Select Category:</label>
    <div class="select">
      <select bind:value={selectedCategory}>
        {#each currentCategories.categories as category}
        <option value={category._id}>{category.title}</option>
        {/each}
      </select>
    </div>
  </div>  
  <Coordinates bind:lat bind:long/>
  <div class="field">
    <div class="control">
      <button onclick={() => AddPlacemarker()} class="button">Submit</button>
    </div>
  </div>
</div>
  
 