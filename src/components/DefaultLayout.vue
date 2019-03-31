<template>
  <div id="app">
    <bluesky-nav-bar/>

    <router-view/>
  </div>
</template>

<script>
import BlueskyNavBar from "@/components/BlueskyNavBar.vue";
export default {
  name: "DefaultLayout",
  components: { BlueskyNavBar }
};
</script>

<style>
</style>
