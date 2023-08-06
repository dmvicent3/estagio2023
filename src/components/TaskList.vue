<template>
  <div>
    <v-row v-if="!isFirstLoad">
      <v-col cols="4" v-for="task in loadTasks" :key="task.id">
        <MyTask :task="task" />
      </v-col>
    </v-row>
    <v-row v-if="isFirstLoad || isNextTasksLoading">
      <v-col cols="4" v-for="index in 18" :key="index">
        <v-skeleton-loader></v-skeleton-loader>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MyTask from "./MyTask.vue";

export default {
  name: "TaskList",
  components: {
    MyTask,
  },
  computed: mapGetters(["loadTasks", "isFirstLoad", "isNextTasksLoading"]),
  methods: {
    ...mapActions(["getTasks"]),
    getNextTasks() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          this.getTasks();
        }
      };
    },
  },
  created() {
    this.getTasks();
  },
  mounted(){
    this.getNextTasks();
  }
};
</script>

<style>
</style>