<template>
  <div class="custom-input">
    <label :for="id" class="custom-input__label">
      <span class="required">*</span>
      <span class="custom-input__label-text">{{ labelText }}</span>
    </label>
    <input
      type="text"
      class="custom-input__input"
      :id="id"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <span class="custom-input__error" v-if="errorMessage">
      {{ errorMessage }}
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
  errorMessage: {
    type: String,
    required: false,
  },
  placeholder: {
    type: String,
    required: false,
  },
});

const emits = defineEmits(["update:modelValue"]);
</script>

<style lang="sass">
.custom-input
  &__label
    font-size: 14px
    font-weight: 500
    line-height: 20px

  &__label-text
    font-size: 14px
    line-height: 24px
    margin-left: 2px

  &__input
    border: 1px solid #C8C8C8
    border-radius: 8px
    background-color: #fff
    padding: 8px
    font-size: 16px
    font-weight: 400
    line-height: 24px

  &__error
    color: #B80020
    font-size: 14px
    font-style: normal
    font-weight: 400
    line-height: 20px
</style>
