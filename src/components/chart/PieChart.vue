<template>
  <div>
    <canvas ref="pieChartCanvas"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";

export default {
  props: ["chartData"],
  mounted() {
    Chart.register(...registerables);
    this.renderPieChart();
  },
  methods: {
    renderPieChart() {
      const ctx = this.$refs.pieChartCanvas.getContext("2d");
      new Chart(ctx, {
        type: "pie",
        data: this.chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    },
  },
};
</script>
