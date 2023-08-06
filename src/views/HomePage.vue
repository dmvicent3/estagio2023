<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Task List</h1>
      </v-col>
      <AddEditTask />
    </v-row>
    <TaskChart @chart-ref="storeChartRef"/>
    <TaskFilter />
    <TaskList />
    <FloatingActionButton :chartRef="chartRef"/>

  </v-container>
</template>

<script>
import TaskList from "../components/TaskList.vue";
import AddEditTask from "../components/AddEditTask.vue";
import TaskFilter from "../components/TaskFilter.vue";
import TaskChart from "@/components/TaskChart.vue";
import FloatingActionButton from "../components/FloatingActionButton.vue";

export default {
  name: "HomePage",
  components: {
    TaskList,
    AddEditTask,
    TaskFilter,
    TaskChart,
    FloatingActionButton
  },
  data() {
    return {
      chartRef: null,
    };
  },
  methods: {
    storeChartRef(ref) {
      this.chartRef = ref;
    },
  },
};
</script>

<style>
</style>