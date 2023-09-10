<template>
  <div class="modal-backdrop" @click="$emit('close-modal')"></div>
  <div class="modal container">
    <slot />
  </div>
</template>

<script setup>
const emit = defineEmits(["close-modal"]);
</script>

<style lang="sass">
.modal-backdrop
  position: fixed
  top: 0
  right: 0
  left: 0
  bottom: 0
  background: rgba(0, 0, 0, .35)
  cursor: pointer

.modal
  position: fixed
  top: 60px
  width: 100%
  z-index: 3
</style>
