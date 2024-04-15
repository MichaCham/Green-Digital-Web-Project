<template>
  <div>
    <h2>Distances Trajets</h2>
    <table class="table">
      <thead>
        <tr>
          <th>Nombre de Personnes</th>
          <th>TGV (km)</th>
          <th>Voiture (km)</th>
          <th>Bus (km)</th>
          <th>Ter (km)</th>
          <th>Metro (km)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(trajet, index) in trajets" :key="index">
          <td>{{ trajet.quantitePersonnes }}</td>
          <td>{{ trajet.kmVoyageTGV.distance }}</td>
          <td>{{ trajet.kmVoyageVoiture.distance }}</td>
          <td>{{ trajet.kmVoyageBus.distance }}</td>
          <td>{{ trajet.kmVoyageTer.distance }}</td>
          <td>{{ trajet.kmVoyageMetro.distance }}</td>
        </tr>
      </tbody>
    </table>

    <h2>Impacts des Transports</h2>
    <table class="table">
      <thead>
        <tr>
          <th>Nombre de Personnes</th>
          <th>TGV (CO2 eq.)</th>
          <th>Voiture (CO2 eq.)</th>
          <th>Bus (CO2 eq.)</th>
          <th>Ter (CO2 eq.)</th>
          <th>Metro (CO2 eq.)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(trajet, index) in trajets" :key="index">
          <td>{{ trajet.quantitePersonnes }}</td>
          <td>{{ trajet.kmVoyageTGV.impact }}</td>
          <td>{{ trajet.kmVoyageVoiture.impact }}</td>
          <td>{{ trajet.kmVoyageBus.impact }}</td>
          <td>{{ trajet.kmVoyageTer.impact }}</td>
          <td>{{ trajet.kmVoyageMetro.impact }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    trajets: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 8px;
  border: 1px solid #ddd;
  text-align: left;
}

.table th {
  background-color: #f2f2f2;
}
</style>
