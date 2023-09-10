<template>
  <div class="file-input">
    <label :for="id" class="custom-input__label">
      <span class="required">*</span>
      <span class="custom-input__label-text">{{ labelText }}</span>
    </label>
    <input
      class="file-input__input"
      type="file"
      ref="fileInputRef"
      @change="onFileChange"
      accept="image/jpeg, image/png, image/webp, image/svg"
    />
    <div
      class="file-input__drop-area"
      :class="{ 'file-input__drop-area_on-drop': isOnDragOver }"
      @click.prevent="triggerUpload"
      v-if="!imgSrc"
      @dragover.prevent="isOnDragOver = true"
      @dragleave.prevent="isOnDragOver = false"
      @drop.prevent="onDrop"
    >
      <div class="file-input__header">
        Загрузите изображение или перетащите файл
      </div>
      <div class="file-input__content">
        <span class="content__line">
          Максимальный размер изображения 10 Мб.
        </span>
        <span class="content__line">
          Допустимые форматы: .jpeg .png .webp .svg
        </span>
        <add-button @click.prevent="triggerUpload" class="file-input__btn" />
      </div>
    </div>
    <div class="file-input__uploaded" v-else @click="triggerUpload">
      <img class="file-input__image" :src="imgSrc" alt="" />
    </div>
  </div>
</template>

<script>
import AddButton from "@/components/ui/AddButton.vue";
import { ref } from "vue";
export default {
  props: {
    id: {},
    labelText: {},
    image: {},
    logoSrc: {},
  },
  emits: ["update:image"],
  setup(props, { emit }) {
    const fileInputRef = ref(null);
    const isOnDragOver = ref(false);
    const imgSrc = ref(props.logoSrc);
    const image = ref(null);

    const MAX_FILE_SIZE = 10240;

    const fileOnload = (file) => {
      if (file.size > MAX_FILE_SIZE) {
        alert("File is too big!");
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        imgSrc.value = reader.result;
        emit("update:image", file);
      };

      reader.readAsDataURL(file);
      image.value = file;
    };

    const onFileChange = (event) => fileOnload(event.target.files[0]);

    const onDrop = (event) => fileOnload(event.dataTransfer.files[0]);

    return {
      fileInputRef,
      onFileChange,
      isOnDragOver,
      imgSrc,
      image,
      onDrop,
      triggerUpload: () => fileInputRef.value.click(),
    };
  },
  components: { AddButton },
};
</script>

<style lang="sass">
.file-input
  &__input
    display: none
  &__drop-area
    border-radius: 8px
    border: 1px dashed #C8C8C8
    background: #fff
    cursor: pointer
    display: flex
    flex-direction: column
    align-items: center
    gap: 2px
    padding: 16px
    &:hover, &_on-drop
      border-color: #656565
  &__header
    font-size: 16px
    font-weight: 400
    line-height: 24px
  &__content
    display: flex
    flex-direction: column
    align-items: center
    font-size: 14px
    font-weight: 400
    line-height: 20px
    color: #656565

  &__btn
    margin-top: 16px

  &__uploaded
    padding: 8px

  &__image
    cursor: pointer
    display: block
    width: 164px
    height: 164px
    border-radius: 50%
    border: 5px solid blue
</style>
