<template>
  <v-col>
    <v-dialog v-model="dialog" width="1024">
      <template v-slot:activator="{ props }">
        <v-btn
          class="float-right"
          :prepend-icon="editing ? 'mdi-square-edit-outline' : 'mdi-plus'"
          v-bind="props"
        >
          {{ editing ? "Edit Task" : "Add Task" }}
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ editing ? "Edit Task" : "Add Task" }}</span>
        </v-card-title>
        <v-form @submit.prevent>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="title"
                    label="Task Description*"
                    required
                    :rules="rules"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              size="large"
              color="danger"
              variant="text"
              @click="dialog = false"
            >
              Cancel
            </v-btn>
            <v-btn
              type="submit"
              size="large"
              variant="text"
              @click="submitTask()"
            >
              {{ editing ? "Update" : "Add" }}
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AddEditTask",
  props: {
    task: Object,
  },
  data: () => ({
    dialog: false,
    editing: false,
    title: "",
    rules: [
      (value) => {
        if (value) return true;
        return "You must enter a task description.";
      },
    ],
  }),
  watch: {
    task: {
      immediate: true,
      handler(taskToEdit) {
        if (taskToEdit) {
          this.title = taskToEdit.title;
          this.editing = true;
        } else {
          this.editing = false;
        }
      },
    },
  },
  methods: {
    ...mapActions(["addTask", "updateTask"]),
    submitTask() {
      if (this.title != "") {
        if (this.editing) {
          this.updateTask({ id: this.task.id, title: this.title });
          this.dialog = false;
        } else {
          this.addTask(this.title);
          this.title = "";
          this.dialog = false;
        }
      }
    },
  },
};
</script>

<style>
</style>