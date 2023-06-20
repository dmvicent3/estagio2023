<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Task List</h1>
      </v-col>
      <AddEditTask />
    </v-row>
    <TaskFilter />
    <TaskList />
  </v-container>
</template>

<script>
import TaskList from "../components/TaskList.vue";
import AddEditTask from "../components/AddEditTask.vue";
import TaskFilter from "../components/TaskFilter.vue";

export default {
  name: "HomePage",
  components: {
    TaskList,
    AddEditTask,
    TaskFilter,
  },
};
</script>

<style>
</style>