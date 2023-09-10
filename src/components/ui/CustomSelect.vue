<template>
  <div class="custom-select">
    <div class="custom-select__label">
      <span class="required">*</span>
      <span class="custom-select__label-text">
        {{ selectLabel }}
      </span>
    </div>

    <div
      class="custom-select__selected-item"
      :class="{ 'custom-select__selected-item_open': isSelectOpen }"
      @click="isSelectOpen = !isSelectOpen"
    >
      <span class="custom-select__selected-item-caption">
        {{ modelValue.title }}
      </span>
      <span class="custom-select__selected-item-icon">
        <arrow-down-icon />
      </span>
    </div>

    <div class="custom-select__options-list" v-if="isSelectOpen">
      <div
        class="custom-select__options-item"
        v-for="option in options"
        :key="option.id"
        :class="{
          'custom-select__options-item_checked': option.id === modelValue.id,
        }"
        @click="change(option)"
      >
        <span class="custom-select__option-caption">
          {{ option.title }}
        </span>
        <check-icon v-if="option.id === modelValue.id" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import ArrowDownIcon from "@/components/icons/ArrowDownIcon.vue";
import CheckIcon from "@/components/icons/CheckIcon.vue";
import { useStore } from "vuex";

export default {
  props: {
    selectLabel: {
      type: String,
      required: true,
    },
    modelValue: {},
    options: {
      type: Array,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const isSelectOpen = ref(false);
    const store = useStore();

    const change = (option) => {
      isSelectOpen.value = false;

      emit("update:modelValue", option);
    };

    return {
      isSelectOpen,
      change,
    };
  },
  components: {
    ArrowDownIcon,
    CheckIcon,
  },
};
</script>

<style lang="sass">
.custom-select
  position: relative

  &__label

  &__label-text
    font-size: 14px
    font-weight: 500
    line-height: 20px
    color: #0A0A0A
    margin-left: 2px

  &__selected-item
    display: flex
    flex-flow: row nowrap
    justify-content: space-between
    align-items: center
    background-color: #fff
    border-radius: 8px
    border: 1px solid #C8C8C8
    padding: 8px
    cursor: pointer
    color: #656565

    &_open
      border: 1px solid #0A0A0A
      color: #121212

  &__selected-item-caption
    font-size: 16px
    line-height: 24px
    font-weight: 400

  &__selected-item-icon
    width: 16px
    height: 16px

  &__options-list
    position: absolute
    top: 66px
    display: flex
    flex-direction: column
    width: calc(100% - 16px)
    gap: 4px
    padding: 8px
    background-color: #fff
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.08), 0px 2px 8px 0px rgba(0, 0, 0, 0.08)
    border: 1px solid #C8C8C8
    border-radius: 8px

  &__options-item
    padding: 6px 8px
    display: flex
    flex-flow: row nowrap
    justify-content: space-between
    align-items: center

    font-size: 16px
    font-weight: 400
    line-height: 24px
    color: #353535

    cursor: pointer

    &_checked
      color: #0A0A0A
</style>
