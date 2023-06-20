<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Post List</h1>
      </v-col>
    </v-row>
    <v-row v-for="post in posts" :key="post.id">
      <MyPost :post="post" />
    </v-row>
    
  </v-container>
</template>

<script>
import axios from "axios";
import MyPost from "../components/MyPost.vue";

export default {
  name: "PostsPage",
  components: { MyPost },
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    async getAllPosts() {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_limit=`
      );
      return res.data;
    },
  },
  async created() {
    this.posts = await this.getAllPosts();
  },
};
</script>

<style>
</style>