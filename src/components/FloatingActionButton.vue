<template>
  <div class="text-center">
    <v-menu open-on-hover>
      <template v-slot:activator="{ props }">
        <VLayoutItem model-value position="bottom" class="text-end" size="88">
          <div class="ma-4">
            <VBtn
              v-bind="props"
              icon="mdi-download"
              size="large"
              color="primary"
              elevation="8"
            />
          </div>
        </VLayoutItem>
      </template>
      <v-btn
        @click="downloadExcel()"
        class="mb-4"
        color="green"
        icon="mdi-microsoft-excel"
        size="large"
      ></v-btn>
      <v-btn
        @click="downloadPDF()"
        class="mb-4"
        color="red"
        icon="mdi-file-pdf-box"
        size="large"
      ></v-btn>
    </v-menu>
  </div>
</template>


<script>
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { utils, writeFile } from "xlsx";
import axios from "axios";

export default {
  name: "FloatingActionButton",
  methods: {
    async downloadPDF() {
      const doc = new jsPDF();
      const tasks = await this.getAllTasks();
      autoTable(doc, {
        head: [["Task", "Completed"]],
        body: tasks,
      });

      doc.save("tasks.pdf");
    },
    async downloadExcel() {
      const tasks = await this.getAllTasks();
      const worksheet = utils.aoa_to_sheet(tasks);
      const workbook = utils.book_new();

      // Add the worksheet to the workbook
      utils.book_append_sheet(workbook, worksheet, "Task List");
      writeFile(workbook, "tasks.xlsx");
    },
    async getAllTasks() {
      const res = await axios.get(`https://jsonplaceholder.typicode.com/todos`);

      const tasks = res.data.map((task) => {
        return [task.title, task.completed];
      });

      return tasks;
    },
  },
};
</script>

<style scoped>
</style>