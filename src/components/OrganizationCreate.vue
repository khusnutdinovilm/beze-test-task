<template>
  <div class="card-item add-organization">
    <div class="card-item__title">
      <h3>Организация</h3>
    </div>
    <div class="card-item__content add-organization__content">
      <div class="add-organization__description">
        Название организации, логотип, описание
      </div>
      <div class="add-organization__add-btn">
        <add-button @click="$emit('open-modal')" />
      </div>
    </div>
  </div>
</template>

<script setup>
import AddButton from "./ui/AddButton.vue";

const emits = defineEmits(["open-modal"]);
</script>

<style lang="sass">
.add-organization
  display: flex
  padding: 24px
  flex-direction: column
  gap: 16px

  &__content
    align-items: center !important

  &__description
    font-size: 15px
    font-style: normal
    font-weight: 400
    line-height: 24px
    color: #353535
    text-align: center
</style>
