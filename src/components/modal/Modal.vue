<template>
  <div class="modal-background" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <slot></slot>
      <button class="cancel-button" @click="$emit('close')">Annuler</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
};
</script>

<style scoped>
.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 100px;
}

.modal-content {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.cancel-button {
  background-color: #e74c3c;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cancel-button:hover {
  background-color: #c0392b;
}
</style>
