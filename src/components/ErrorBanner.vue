<template>
  <div class="error-banner">
    <div class="error-banner__container">
      <p class="error-banner__content">{{ errorMessage }}</p>
      <button class="error-banner__cross-button" @click="closeBanner">
        <CrossIcon />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import CrossIcon from "../assets/CrossIcon.vue";
import { useStore } from "../store/store";

const store = useStore();

function closeBanner() {
  store.setErrorMessage("");
}

const errorMessage = computed(
  () => `Error occurred while ${store.errorMessage}!`
);
</script>

<style lang="scss">
.error-banner {
  position: fixed;
  left: 10%;
  top: 24px;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;

  &__container {
    background-color: var(--bright-blue);
    margin: 0px;
    color: white;
    display: flex;
    width: 800px;
    max-width: 900px;
    border-radius: 4px;
    align-items: center;
    justify-content: center;
    padding: 8px;
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
      rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
      rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
  }

  &__content {
    margin: 12px 20px;
    width: 100%;
    text-align: center;
  }

  &__cross-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px 6px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      fill: white;
    }
  }
}
</style>
