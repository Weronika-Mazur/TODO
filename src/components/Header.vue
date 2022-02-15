<template>
  <header class="header">
    <h1 class="header__title">TODO</h1>
    <button class="header__btn" :class="{ 'header__btn--disabled': disabled }">
      <img src="../assets/icon-sun.svg" />
    </button>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      disabled: false,
    };
  },
};
</script>
