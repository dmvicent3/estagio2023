<template>
  <div id="test" class="text-center">
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
      <v-btn
        @click="downloadChartPDF()"
        class="mb-4"
        color="red"
        icon="mdi-chart-bar"
        size="large"
      ></v-btn>
    </v-menu>
  </div>
</template>


<script>
import jsPDF from "jspdf";
//import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";

import autoTable from "jspdf-autotable";
import { utils, writeFile } from "xlsx";
import axios from "axios";

export default {
  name: "FloatingActionButton",
  props: {
    chartRef: Object,
  },
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

    async downloadChartPDF() {
      html2pdf(this.chartRef, { margin: 1,filename: "i-was-html.pdf"});
      /*html2canvas(this.chartRef).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF("p", "px", "a4");
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        console.log(imgProps)
        console.log(pdfWidth)
        // Calculate center alignment horizontally
        const xPos = (pdf.internal.pageSize.getWidth() - pdfWidth) / 2;
        const yPos = 10; // Adjust the vertical position as needed

        pdf.addImage(imgData, 'PNG', xPos, yPos, pdfWidth, pdfHeight);
        //pdf.save('exported_content.pdf');
      });*/
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