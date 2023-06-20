<template>
  <v-card
    :class="task.completed ? 'completed' : 'incompleted'"
    :title="task.title"
    @click="toggleTask(task)"
  >
    <v-card-actions class="justify-space-between">
      <AddEditTask :task="task"/>
      <v-btn
        @click="deleteTask(task.id)"
        color="error"
        prepend-icon="mdi-close"
      >
        Delete
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
import AddEditTask from "./AddEditTask.vue";

export default {
  name: "MyTask",
  props: {
    task: Object,
  },
  components: {
    AddEditTask,
  },
  methods: {
    ...mapActions(["deleteTask", "updateTask"]),
    toggleTask(task) {
      const updatedTask = {
        ...task,
        completed: !task.completed,
      };
      this.updateTask(updatedTask);
    },
  },
};
</script>

<style scoped>
.incompleted {
  border-top: 5px solid #f57f7f;
}
.completed {
  border-top: 5px solid #12de90;
}
</style>
