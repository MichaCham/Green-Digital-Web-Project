<template>
  <div>
    <canvas ref="barPlotCanvas"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";

export default {
  props: ["chartData"],
  mounted() {
    Chart.register(...registerables);
    this.renderBarPlot();
  },
  methods: {
    renderBarPlot() {
      const ctx = this.$refs.barPlotCanvas.getContext("2d");
      new Chart(ctx, {
        type: "bar",
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
