<script lang="ts">
  import { currentCategories } from "$lib/runes.svelte";
</script>

<table class="table is-fullwidth">
  <thead>
    <tr>
      <th>Category</th>
      <th>Image</th>
    </tr>
  </thead>
  <tbody>
    {#each currentCategories.categories as category}
      <tr>
        <td>{category.title}</td>
        <td>
          {#if category.img}
            <!-- svelte-ignore a11y_img_redundant_alt -->
            <img src={category.img} alt="Category image" class="category-image image is-128x128" />
          {:else}
            No image uploaded
          {/if}
        </td>
      </tr>
    {/each}
  </tbody>
</table>