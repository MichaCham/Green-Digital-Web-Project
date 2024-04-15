<!-- ImportCSVDialog.vue -->
<template>
  <div class="import-csv-dialog">
    <div class="overlay" @click="closeDialog"></div>
    <div class="dialog">
      <h2>Sélectionner les fichiers CSV à importer</h2>
      <input type="file" @change="handleFileChange(0)" />
      <input type="file" @change="handleFileChange(1)" />
      <input type="file" @change="handleFileChange(2)" />
      <div class="buttons">
        <button @click="importCSVs" :disabled="!allFilesSelected">
          Importer
        </button>
        <button @click="closeDialog">Annuler</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImportCSVDialog",
  methods: {
    closeDialog() {
      this.$emit("close");
    },
    handleFileChange(index, event) {
      this.selectedFiles[index] = event.target.files[0];
    },
    importCSVs() {
      // Vérifier si les trois fichiers ont été sélectionnés
      if (!this.allFilesSelected) {
        alert("Veuillez sélectionner trois fichiers CSV.");
        return;
      }
      // Traitement des fichiers CSV importés...
      alert("Fichiers importés avec succès !");
      this.closeDialog();
    },
  },
  computed: {
    allFilesSelected() {
      return this.selectedFiles.every((file) => file !== null);
    },
  },
  data() {
    return {
      selectedFiles: [null, null, null],
    };
  },
};
</script>

<style scoped>
.import-csv-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.dialog {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.buttons {
  margin-top: 20px;
  text-align: right;
}

input[type="file"] {
  margin-bottom: 10px;
}
</style>
