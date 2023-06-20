<template>
  <header>
    <v-navigation-drawer>
      <v-list>
        <v-list-item title="Navigation drawer"></v-list-item>
        <v-list-item
          prepend-icon="mdi-view-dashboard"
          title="1"
          to="/home"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-forum"
          title="2"
          to="posts"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar title="Application bar"></v-app-bar>
  </header>
</template>

<script>
export default {
  name: "NavigationBar",
};
</script>

<style>
</style>

