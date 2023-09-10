<template>
  <button class="add-btn">
    <add-icon class="add-btn__icon" />
    <span class="add-btn__caption">Добавить</span>
  </button>
</template>

<script setup>
import AddIcon from "@/components/icons/PlusIcon.vue";
</script>

<style lang="sass">
.add-btn
  display: flex
  flex-flow: row nowrap
  padding: 4px 8px
  justify-content: center
  align-items: center
  gap: 8px
  border: none
  border-radius: 6px
  background-color: #E8F2FE
  cursor: pointer

  &:hover
    background-color: #D9EAFE

  &:active
    background-color: #A6CEFD

  &__icon
    width: 16px
    height: 15px

  &__caption
    font-size: 14px
    font-weight: 500
    line-height: 20px
    color: #045CC4
</style>
