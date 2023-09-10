<template>
  <div class="card-item organization-card">
    <div class="card-item__header">
      <h3 class="card-item__title">Организация</h3>
      <div class="card-item__button">
        <edit-button @click="$emit('update-organization')" />
      </div>
    </div>
    <div class="card-item__content organization-card__content">
      <div class="organization-card__content-item">
        <div class="organization-card__content-title">Тип</div>
        <div class="organization__type organization-card__content-description">
          {{ organizationItem.typeName }}
        </div>
      </div>

      <div class="organization-card__content-item">
        <div class="organization-card__content-title">Название организации</div>
        <div class="organization__type organization-card__content-description">
          {{ organizationItem.organizationName }}
        </div>
      </div>

      <div
        class="organization-card__content-item"
        v-if="organizationItem.description"
      >
        <div class="organization-card__content-title">Описание</div>
        <div class="organization__type organization-card__content-description">
          {{ organizationItem.description }}
        </div>
      </div>
      <div class="organization-card__content-item" v-if="organizationItem.logo">
        <div class="organization-card__content-title">Логотип</div>
        <div class="organization-card__content-logo">
          <img class="organization-card__image" :src="organizationItem.logo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import EditButton from "./ui/EditButton.vue";

const props = defineProps({
  organizationItem: {
    type: Object,
  },
});

const emit = defineEmits(["update-organization"]);

const store = useStore();
</script>

<style lang="sass">
.organization-card
  &__header
    display: flex
    flex-flow: row nowrap
    width: 100%
    justify-content: space-between
    margin-bottom: 16px

  &__title
    font-family: 'Inter', 'sans-serif'
    font-size: 20px
    font-weight: 700
    line-height: 24px
    color: #353535

  &__content
    display: flex
    flex-direction: column
    align-items: flex-start
    align-self: stretch
    gap: 12px

  &__content-item
    display: flex
    flex-direction: column
    align-items: flex-start
    gap: 2px
    align-self: stretch

  &__content-title
    font-size: 14px
    font-weight: 300
    line-height: 20px
    color: #656565

  &__content-description
    font-size: 16px
    font-weight: 500
    line-height: 24px

  &__content-logo
    padding: 8px

  &__image
    display: block
    width: 164px
    height: 164px
    border-radius: 50%
    border: 5px solid blue
</style>
