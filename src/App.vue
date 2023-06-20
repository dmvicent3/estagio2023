<template>
  <v-card>
    <v-layout>
      <NavigationBar />
      <v-main style="min-height: 300px">
        <router-view ></router-view>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
import NavigationBar from "./components/NavigationBar.vue";

export default {
  name: "App",
  components: {
    NavigationBar,
  },
};
</script>

<style>
</style>
