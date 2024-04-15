<template>
  <div class="impact-applications">
    <h2>Répartition de l'impact par application</h2>
    <div class="pie-chart-container">
      <pie-chart :chart-data="impactByApplicationChartData" />
    </div>

    <h2>Détails de l'impact par application</h2>
    <table class="application-table">
      <thead>
        <tr>
          <th>Application</th>
          <th>Impact (tCO2 eq.)</th>
          <th>Nombre de requêtes</th>
          <th>Poids de la page (kb)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(app, index) in projet.applications" :key="index">
          <td>{{ app.url }}</td>
          <td>{{ app.impact }}</td>
          <td>{{ app.nombre_requete }}</td>
          <td>{{ app.poid_page }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import PieChart from "../chart/PieChart.vue";

export default {
  name: "ImpactApplication",
  components: {
    PieChart,
  },
  props: {
    projet: Object,
  },
  computed: {
    impactByApplicationChartData() {
      const data = {
        labels: this.projet.applications.map((app) => app.url),
        datasets: [
          {
            backgroundColor: [
              "#4CAF50",
              "#8BC34A",
              "#CDDC39",
              "#FFEB3B",
              "#FFC107",
            ],
            data: this.projet.applications.map((app) => app.impact),
          },
        ],
      };

      return data;
    },
  },
};
</script>

<style scoped>
.impact-applications {
  padding: 20px;
}

.pie-chart-container {
  margin-bottom: 20px;
}

.application-table {
  width: 100%;
  border-collapse: collapse;
}

.application-table th,
.application-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.application-table th {
  background-color: #4caf50;
  color: white;
}
</style>
