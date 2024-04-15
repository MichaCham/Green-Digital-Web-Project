<template>
  <div class="impact-equipement-physique">
    <h2>Répartition de l'impact par équipement</h2>
    <div class="pie-chart-container">
      <pie-chart :chart-data="impactByEquipmentChartData" />
    </div>

    <h2>Impact par étape de vie pour chaque équipement</h2>
    <div class="bar-plot-container">
      <div
        v-for="(equipement, index) in projet.equipements"
        :key="index"
        class="equipement-details"
      >
        <h3>{{ equipement.type }}</h3>
        <bar-plot :chart-data="impactByLifecycleStepChartData(equipement)" />
      </div>
    </div>
  </div>
</template>

<script>
import PieChart from "../chart/PieChart.vue";
import BarPlot from "../chart/BarPlot.vue";

export default {
  name: "ImpactEquipementPhysique",
  components: {
    PieChart,
    BarPlot,
  },
  props: {
    projet: Object,
  },
  computed: {
    impactByEquipmentChartData() {
      const data = {
        labels: [],
        datasets: [
          {
            backgroundColor: [
              "#4CAF50",
              "#8BC34A",
              "#CDDC39",
              "#FFEB3B",
              "#FFC107",
            ],
            data: this.projet.equipements.map(
              (equipement) => equipement.somme_impact
            ),
          },
        ],
      };

      return data;
    },
  },
  methods: {
    impactByLifecycleStepChartData(equipement) {
      const data = {
        labels: equipement.etapes_vie.map((etape) => etape.etape),
        datasets: [
          {
            label: "Impact par étape de vie en tCO2 eq",
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
            ],
            data: equipement.etapes_vie.map((etape) => etape.impact),
          },
        ],
      };

      return data;
    },
  },
};
</script>

<style scoped>
.impact-equipement-physique {
  padding: 20px;
}

.pie-chart-container {
  margin-bottom: 20px;
}

.bar-plot-container {
  display: flex;
  flex-wrap: wrap;
}

.equipement-details {
  width: 50%;
  padding: 10px;
  box-sizing: border-box;
}
</style>
