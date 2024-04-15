<template>
  <div class="container">
    <!-- Contenu principal -->
    <div class="content">
      <h1 @click="logSample()">Détails du Lot</h1>
      <p>Projet : {{ projectName }}</p>
      <p>Lot : {{ lotName }}</p>
      <p>Somme globale des impacts : {{ totalImpact }} tCO2 eq.</p>
      <p>Nombre d'équipements physiques : {{ nombreEquipements }}</p>
      <p>
        Nombre de liens d'applications calculé : {{ nombreLiensApplications }}
      </p>
      <p>Quantité totale de trajets : {{ quantiteTrajets }}</p>

      <!-- Barre de navigation -->
      <nav class="navbar">
        <ul>
          <li @click="selectedSection = 'equipement'">Equipement Physique</li>
          <li @click="selectedSection = 'application'">Application</li>
          <li @click="selectedSection = 'projetsTransports'">
            Projets Transports
          </li>
        </ul>
      </nav>

      <!-- Contenu de la section sélectionnée -->
      <div class="section-content">
        <!-- Sections conditionnelles -->
        <div v-if="selectedSection === 'equipement'">
          <ImpactEquipementPhysique :projet="projetEquipementPhysique" />
        </div>
        <div v-if="selectedSection === 'application'">
          <ImpactApplication :projet="projetApplication" />
        </div>
        <div v-if="selectedSection === 'projetsTransports'" class="section">
          <ImpactTrajet :trajets="projetTrajet.trajets" />
        </div>
      </div>
    </div>

    <!-- PieChart -->
    <div class="pie-chart-container">
      <pie-chart :chart-data="impactDistributionChartData" />
    </div>
  </div>
</template>

<script>
import dataSample from "../assets/sample/dataSample.json";
import ImpactEquipementPhysique from "./LotComponents/ImpactEquipementPhysique.vue";
import ImpactApplication from "./LotComponents/ImpactApplication.vue";
import ImpactTrajet from "./LotComponents/ImpactVoyage.vue";
import PieChart from "../components/chart/PieChart.vue";

export default {
  name: "LotDetails",
  components: {
    ImpactEquipementPhysique,
    ImpactApplication,
    ImpactTrajet,
    PieChart,
  },
  props: ["projectName", "lotName"],
  data() {
    return {
      selectedSection: "equipement",
      projetApplication: dataSample.projetsApplications[0],
      projetEquipementPhysique: dataSample.equipementPhysique[0],
      projetTrajet: dataSample.projetTransports[0],
      totalImpact:
        dataSample.projetsApplications[0].somme_impact +
        dataSample.equipementPhysique[0].somme_impact +
        dataSample.projetTransports[0].somme_impact,
    };
  },
  computed: {
    nombreEquipements() {
      return this.countEquipements();
    },
    nombreLiensApplications() {
      if (this.projetApplication && this.projetApplication.applications) {
        return this.projetApplication.applications.length;
      } else {
        return 0;
      }
    },
    impactDistributionChartData() {
      const totalImpact = this.totalImpact;
      const applicationImpactPercentage =
        (this.projetApplication.somme_impact / totalImpact) * 100;
      const equipementPhysiqueImpactPercentage =
        (this.projetEquipementPhysique.somme_impact / totalImpact) * 100;
      const transportsImpactPercentage =
        (this.projetTrajet.somme_impact / totalImpact) * 100;

      return {
        labels: ["Applications %", "Equipements physiques %", "Transports %"],
        datasets: [
          {
            backgroundColor: ["#4CAF50", "#FFC107", "#2196F3"],
            data: [
              applicationImpactPercentage,
              equipementPhysiqueImpactPercentage,
              transportsImpactPercentage,
            ],
          },
        ],
      };
    },
    quantiteTrajets() {
      return this.countTrajets();
    },
  },
  methods: {
    countEquipements() {
      let count = 0;
      if (
        this.projetEquipementPhysique &&
        this.projetEquipementPhysique.equipements
      ) {
        this.projetEquipementPhysique.equipements.forEach((equipement) => {
          count += equipement.quantite;
        });
      }
      return count;
    },
    countTrajets() {
      let count = 0;
      if (this.projetTrajet && this.projetTrajet.trajets) {
        this.projetTrajet.trajets.forEach((trajet) => {
          count += trajet.quantitePersonnes;
        });
      }
      return count;
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
}

.content {
  flex: 1;
}

.pie-chart-container {
  width: 30%;
}

.navbar {
  background-color: #f2f2f2;
  padding: 10px 0;
}

.navbar ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.navbar ul li {
  display: inline-block;
  padding: 10px 20px;
  cursor: pointer;
}

.section-content {
  padding: 20px;
}

.card {
  background-color: #f9f9f9;
  padding: 10px;
  margin-bottom: 10px;
}

.card h3 {
  margin-top: 0;
}

.card p {
  margin: 5px 0;
}
</style>
