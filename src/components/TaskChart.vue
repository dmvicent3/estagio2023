<template>
  <div ref="chartRef">
    <apexchart
      width="500"
      type="bar"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TaskChart",
  data() {
    return {
      tasks: [],
      chartOptions: {},
      series: [],
    };
  },
  mounted() {
    this.$emit('chart-ref', this.$refs.chartRef);
  },
  methods: {
    async getAllTasks() {
      const res = await axios.get(`https://jsonplaceholder.typicode.com/todos`);

      const tasks = res.data.map((task) => {
        return [task.userId, task.completed];
      });

      return tasks;
    },
  },
  async created() {
    this.tasks = await this.getAllTasks();

    const sumCompletes = this.tasks.reduce((sum, task) => {
      const userId = task[0];
      const completed = task[1];

      if (!sum[userId]) {
        sum[userId] = { userId, completed: 0 };
      }

      sum[userId].completed += completed ? 1 : 0;

      return sum;
    }, {});
    
    const nCompletedTasks = Object.values(sumCompletes);

    const chartCategories = nCompletedTasks.map((task) =>  task.userId);
    const chartData = nCompletedTasks.map((task) =>  task.completed);


    (this.chartOptions = {
      chart: {
        id: "vuechart-example",
      },
      xaxis: {
        name: "UserId",
        categories: chartCategories,
      },
    }),
      (this.series = [
        {
          name: "Completed Tasks",
          data: chartData,
        },
      ]);
  },
};
</script>

<style>
</style>