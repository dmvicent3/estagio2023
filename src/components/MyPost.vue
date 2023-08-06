<template>
  <v-card
    :id="'card' + post.id"
    class="mx-auto mb-4"
    variant="outlined"
    width="568"
  >
    <v-img
      class="align-end text-white"
      height="200"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      cover
    >
      <v-card-title>{{ post.id + " - " + post.title }}</v-card-title>
    </v-img>
    <v-card-text>
      <div>{{ post.body }}</div>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-title class="pt-4"> Comments </v-card-title>
    <v-list class="bg-transparent">
      <v-list-item
        v-for="comment in comments"
        :key="comment.id"
        :title="comment.email"
        :subtitle="comment.body"
      >
        <v-divider class="mt-1 mb-1"></v-divider>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "MyPost",
  data() {
    return {
      comments: [],
    };
  },
  props: {
    post: Object,
  },
  methods: {
    async getPostComments() {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/post/${this.post.id}/comments?_limit=2`
      );
      return res.data;
    },
    
    onScroll(entries) {
      if (this.comments.length < 1) {

        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            this.comments = await this.getPostComments();
          }
        });

      }
    },
  },
  async created() {
    //this.comments = await this.getPostComments();
  },
  mounted() {
    const options = {
      //root: document.querySelector("#scrollArea" + this.post.id),
      rootMargin: "0px",
      threshold: 0.2,
    };

    let observer = new IntersectionObserver(this.onScroll, options);
    const element = document.querySelector("#card" + this.post.id);
    observer.observe(element);
  },
};
</script>

<style>
</style>