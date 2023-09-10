<template>
  <div class="custom-textarea">
    <label :for="id" class="custom-textarea__label">
      {{ labelText }}
    </label>
    <textarea
      class="custom-textarea__input"
      :id="id"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
    <span class="custom-textarea__mark">
      Описание в модуле на сайте не показывается
    </span>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {},
  id: {
    type: String,
    required: true,
  },
  labelText: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
  },
});

const emits = defineEmits(["update:modelValue"]);
</script>

<style lang="sass">
.custom-textarea

  &__label
    font-size: 14px
    font-weight: 500
    line-height: 20px
    color: #0A0A0A
  &__input
    border-radius: 8px
    border: 1px solid #C8C8C8
    background-color: #fff
    padding: 8px
    font-size: 16px
    font-weight: 400
    line-height: 24px

  &__mark
    font-size: 14px
    font-weight: 400
    line-height: 20px
    color: #656565
</style>
