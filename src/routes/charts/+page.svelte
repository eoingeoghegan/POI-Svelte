<script lang="ts">
  import {currentCategories, currentPlacemarkers, subTitle} from "$lib/runes.svelte";
// @ts-ignore
  import Chart from "svelte-frappe-charts";
  import { onMount } from "svelte";

  subTitle.text = "Charts";

  const placemarkersByCategory = {
    labels: [],
    datasets: [
        {values: [0,0]}
    ]
};

const placemarkersByDifficulty = {
    labels: ["Easy", "Moderate","Hard", "Expert"],
    datasets: [
        {values: [0,0, 0, 0]}
    ]
};

onMount(async () => {
    
  placemarkersByCategory.labels = [];
    currentCategories.categories.forEach((categoryid,i) => {
      // @ts-ignore
      placemarkersByCategory.labels.push(`${categoryid.title}`);
      placemarkersByCategory.datasets[0].values.push(0);

      currentPlacemarkers.placemarkers.forEach((placemarker) => {
         if(placemarker.categoryid._id == categoryid._id) {
           placemarkersByCategory.datasets[0].values[i] += 1;
         }
       })
    });
  
// Placemarkers by Difficulty

  currentPlacemarkers.placemarkers.forEach((placemarker) => {
    if (placemarker.difficulty === "Easy") {
      placemarkersByDifficulty.datasets[0].values[0] += 1;
    } else if (placemarker.difficulty === "Moderate") {
      placemarkersByDifficulty.datasets[0].values[1] += 1;
    } else if (placemarker.difficulty === "Hard") {
      placemarkersByDifficulty.datasets[0].values[2] += 1;
    } else if (placemarker.difficulty === "Expert") {
      placemarkersByDifficulty.datasets[0].values[3] += 1;
    }
  });
});

</script>

<div class="columns">
    <div class="column box has-text-centered">
        <h1 class="title is-4">Placemarkers By Category</h1>
        <Chart data={placemarkersByCategory} type="pie" />
    </div>
    <div class="column box has-text-centered">
      <h1 class="title is-4">Placemarkers By Difficulty</h1>
      <Chart data={placemarkersByDifficulty} type="bar" />
  </div>
</div>