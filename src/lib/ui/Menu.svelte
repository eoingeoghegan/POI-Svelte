<script lang="ts">
  import { loggedInUser } from "$lib/runes.svelte";
</script>

<nav class="navbar is-full-width">
  <div class="container">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <span class="icon"> <i class="fas fa-map-marker-alt"></i></span><span class="icon mr-1">
        <span><strong>POI</strong> </span>
      </a>
    </div>
    <div id="navbarMenu" class="navbar-menu">
      <div class="navbar-end">
        
        <a class="navbar-item " href="/dashboard"> Dashboard </a>
        <a class="navbar-item " href="/placemarkerReport"> PlacemarkerReport </a>
        <a class="navbar-item " href="/charts">Charts</a>
         <a class="navbar-item " href="/uploadImage">Images</a>
        <a class="navbar-item " href="/maps">Maps</a>
        <a class="navbar-item " href="/about"> About </a>
        <a class="navbar-item " href="/user"> User </a>
        <a class="navbar-item " href="/logout"> Logout [{loggedInUser.email}]</a>
      </div>
      <div></div>
    </div>
  </div>
</nav>
