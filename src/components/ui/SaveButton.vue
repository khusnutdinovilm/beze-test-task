<template>
  <button class="save-btn">Сохранить</button>
</template>

<script>
export default {};
</script>

<style lang="sass">
.save-btn
  border: none
  border-radius: 8px
  background-color: #1588C9
  color: #ffffff
  padding: 12px 16px
  width: 100%
  cursor: pointer

  &:hover
    background: var(--admin-primaty-hover, linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #1588C9)

  &:active
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%), #1588C9

  &:disabled
    background: #00000033
</style>
