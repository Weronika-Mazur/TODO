<template>
  <header class="header">
    <h1 class="header__title">TODO</h1>
    <button class="header__btn" :class="{ 'header__btn--disabled': disabled }">
      <SunIcon />
    </button>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SunIcon from "../assets/SunIcon.vue";

export default defineComponent({
  name: "Header",
  data() {
    return {
      disabled: false,
    };
  },
  components: {
    SunIcon,
  },
});
</script>

<style lang="scss">
.header {
  display: flex;
  align-items: space-between;
  justify-content: space-between;

  &__title {
    font-size: 42px;
    letter-spacing: 12px;
  }

  &__btn {
    background: none;
    border: none;
    cursor: pointer;
  }
}
</style>
