<template>
  <button class="edit-btn">
    <edit-icon class="edit-btn__icon" />
    <span class="edit-btn__caption" v-if="$store.getters.isDesktop">Редактировать</span>
  </button>
</template>

<script setup>
import EditIcon from "@/components/icons/EditIcon.vue";
</script>

<style lang="sass">
.edit-btn
  background-color: #ededed
  border-radius: 6px
  border: none
  padding: 4px 8px
  display: flex
  flex-flow: row nowrap
  justify-content: space-between
  align-items: center
  gap: 8px
  cursor: pointer

  &__icon
    width: 16px
    height: 16px

  &__caption
    font-weight: 500
    font-size: 14px
    line-height: 20px
    color: #353535
</style>
