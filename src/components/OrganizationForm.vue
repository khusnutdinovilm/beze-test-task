<template>
  <div class="card-item organization-form">
    <div class="card-item__header organization-form__header">
      <h3 class="card-item__title organization-form__title">Организация</h3>
      <div class="card-item__btn">
        <cancel-button @click="$emit('close-modal')" />
      </div>
    </div>

    <form
      class="card-item__content organization-form__content"
      @submit.prevent="submit"
    >
      <custom-select
        class="organization-form__select"
        selectLabel="Тип"
        :options="selectItems"
        v-model="selectedItem"
      />

      <custom-input
        class="organization-form__text-input"
        labelText="Название организации"
        :errorMessage="orgNameError"
        placeholder="Введите название организации"
        id="organizationName"
        v-model="organizationName"
      />

      <custom-textarea
        class="organization-form__textarea"
        label-text="Описание"
        placeholder="Введите описание"
        id="descrtiption"
        v-model="description"
      />

      <custom-file-input
        class="organization-form__file-input"
        labelText="Логотип"
        id="org-logo"
        :logoSrc="logoSrc"
        v-model:image="image"
      />

      <div class="organization-form__save-btn">
        <save-button />
      </div>
    </form>
  </div>
</template>

<script>
import CancelButton from "@/components/ui/CancelButton.vue";
import SaveButton from "@/components/ui/SaveButton.vue";

import CustomSelect from "@/components/ui/CustomSelect.vue";
import CustomInput from "@/components/ui/CustomInput.vue";
import CustomTextarea from "@/components/ui/CustomTextarea.vue";
import CustomFileInput from "@/components/ui/CustomFileInput.vue";

import { useStore } from "vuex";
import { computed, ref } from "vue";

import * as yup from "yup";
import { useField, useForm } from "vee-validate";

export default {
  props: {
    formData: {
      type: Object,
    },
  },
  emits: ["close-modal", "update-organization", "create-organization"],
  setup(props, { emit }) {
    const store = useStore();
    const selectItems = computed(() => store.getters.organizationTypes);

    const logoSrc = ref(props.formData.logo);

    const image = ref(null);

    const imgError = computed(() => image.value || logoSrc.value !== "");

    const selectedItem = ref(
      store.getters.organizationTypes.find(
        (select) => select.id === props.formData.typeId
      )
    );

    const { handleSubmit, isSubmiting, isValidating } = useForm({
      initialValues: {
        organizationName: props.formData.organizationName
          ? props.formData.organizationName
          : "",
        description: props.formData.description
          ? props.formData.description
          : "",
      },
    });

    const { value: organizationName, errorMessage: orgNameError } = useField(
      "organizationName",
      yup.string().trim().required("Поле не должно быть пустым.")
    );

    const { value: description } = useField("description", yup.string().trim());

    const submit = handleSubmit((values) => {
      const formData = {
        typeId: selectedItem.value.id,
        typeName: selectedItem.value.title,
        ...values,
      };

      if (props.formData.id) {
        emit(
          "update-organization",
          { id: props.formData.id, ...formData },
          image.value
        );
      } else {
        emit("create-organization", formData, image.value);
      }
    });

    return {
      logoSrc,
      isValidating,
      imgError,
      image,
      organizationName,
      orgNameError,
      description,
      selectItems,
      selectedItem,
      submit,
      isSubmiting,
    };
  },
  components: {
    CancelButton,
    SaveButton,
    CustomSelect,
    CustomInput,
    CustomTextarea,
    CustomFileInput,
  },
};
</script>

<style lang="sass">
.organization-form
  gap: 12px !important
  &__header
  &__title
  &__select, &__text-input, &__textarea, &__file-input, &__save-btn
    display: flex
    flex-direction: column
    gap: 2px
    align-self: stretch
</style>
