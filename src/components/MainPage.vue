<template>
  <div id="app" class="green-it">
    <h1>Liste de Projets</h1>
    <button @click="createProject" class="green-button">Créer un Projet</button>
    <ul>
      <li
        v-for="(project, index) in projects"
        :key="index"
        class="project-item"
      >
        <a href="#" @click.prevent="showLots(project)" class="project-link">
          {{ project.name }}
        </a>
        <button @click="addLot(index)" class="green-button">
          Ajouter un Lot
        </button>
        <button @click="deleteProject(index)" class="delete-button">
          <i class="fas fa-trash"></i> Supprimer
        </button>
      </li>
    </ul>
    <div v-if="selectedProject" class="selected-project">
      <h2 class="project-title">
        Lots de Calcul pour {{ selectedProject.name }}
      </h2>
      <ul class="lot-list">
        <li
          v-for="(lot, index) in selectedProject.lots"
          :key="index"
          class="lot-item"
        >
          <router-link
            :to="{
              name: 'lot',
              params: { projectName: selectedProject.name, lotName: lot.name },
            }"
            class="lot-link"
          >
            {{ lot.name }}
          </router-link>
        </li>
      </ul>
    </div>
    <modal v-if="showDatePickerModal" @close="showDatePickerModal = false">
      <Datepicker
        v-model="selectedDate"
        format="DD/MM/YYYY"
        :placeholder="'Sélectionnez une date pour le lot'"
      ></Datepicker>
      <button @click="saveLotWithDate" class="confirm-button">Valider</button>
    </modal>
  </div>
</template>

<script>
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import Modal from "./modal/Modal.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "App",
  components: {
    Datepicker,
    Modal,
    FontAwesomeIcon,
  },
  data() {
    return {
      projects: [
        {
          name: "Projet 1",
          lots: [
            { name: "10/02/2023" },
            { name: "10/02/2023" },
            { name: "10/02/2023" },
          ],
        },
        {
          name: "Projet 2",
          lots: [{ name: "10/02/2023" }, { name: "10/02/2023" }],
        },
        { name: "Projet 3", lots: [{ name: "10/02/2023" }] },
      ],
      selectedProject: null,
      showDatePickerModal: false,
      selectedDate: null,
      newLotProjectIndex: null,
    };
  },
  methods: {
    showLots(project) {
      this.selectedProject = project;
    },
    openImportDialog() {
      const files = prompt(
        "Veuillez sélectionner trois fichiers CSV à importer:",
        ""
      );
      if (files) {
        const fileNames = files.split(",").map((fileName) => fileName.trim());
        if (fileNames.length === 3) {
          // Traitement des fichiers CSV importés...
          alert("Fichiers importés avec succès !");
        } else {
          alert("Veuillez sélectionner exactement trois fichiers CSV.");
        }
      }
    },
    createProject() {
      const projectName = prompt("Nom du nouveau projet:");
      if (projectName) {
        this.projects.push({ name: projectName, lots: [] });
      }
    },
    addLot(index) {
      this.newLotProjectIndex = index;
      this.showDatePickerModal = true;
    },
    saveLotWithDate() {
      if (this.selectedDate) {
        this.projects[this.newLotProjectIndex].lots.push({
          name: this.selectedDate,
        });
        this.showDatePickerModal = false;
        this.selectedDate = null;
      } else {
        alert("Veuillez sélectionner une date.");
      }
    },
    deleteProject(index) {
      if (confirm("Êtes-vous sûr de vouloir supprimer ce projet?")) {
        this.projects.splice(index, 1);
        this.selectedProject = null; // Réinitialise la sélection si le projet supprimé était sélectionné
      }
    },
  },
};
</script>

<style scoped>
.green-it {
  font-family: Arial, sans-serif;
  color: #333;
}

.green-button {
  background-color: #5cb85c;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  cursor: pointer;
  border-radius: 5px;
}

.delete-button {
  background-color: #d9534f;
}

.project-item {
  background-color: #dff0d8;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
}

.project-link {
  flex-grow: 1;
  color: #333;
  text-decoration: none;
}

.selected-project {
  margin-top: 20px;
}

.lot-item {
  background-color: #d9edf7;
  padding: 5px;
  margin-bottom: 3px;
  border-radius: 3px;
}

.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Aligner la modal en haut de l'écran */
  padding-top: 100px; /* Ajustez la valeur en fonction de la hauteur de la modal */
}

.modal-content {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.confirm-button {
  background-color: #2ecc71;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.confirm-button:hover {
  background-color: #27ae60;
}

.delete-button {
  background-color: #e74c3c;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-left: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.delete-button:hover {
  background-color: #c0392b;
}

.selected-project {
  margin-top: 20px;
}

.project-title {
  font-size: 20px;
  margin-bottom: 10px;
}

.lot-list {
  list-style-type: none;
  padding: 0;
}

.lot-item {
  margin-bottom: 5px;
}

.lot-link {
  color: #333;
  text-decoration: none;
  display: inline-block;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #f0f0f0;
  transition: background-color 0.3s ease;
}

.lot-link:hover {
  background-color: #e0e0e0;
}
</style>
