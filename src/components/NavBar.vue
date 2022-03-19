<template>
  <nav class="nav-bar">
    <h1 class="nav-bar__logo">TODO</h1>
    <div class="nav-bar__container">
      <p class="nav-bar__username">{{ username }}</p>
      <UserIcon class="nav-bar__user-icon" />
      <button class="nav-bar__log-out" @click="logOut">Log out</button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import UserIcon from "../assets/UserIcon.vue";
import { computed } from "vue";
import { useStore } from "../store/store";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const username = computed(() => store.username);

function logOut() {
  localStorage.removeItem("jwt");
  store.setUsername();
  router.push({ name: "Login" });
}
</script>

<style lang="scss" scoped>
.nav-bar {
  position: fixed;
  width: 100vw;
  top: 0px;
  left: 0px;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--very-dark-desaturated-blue);
  padding: 10px 0px;

  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
    rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
    rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;

  &__container {
    display: flex;
    align-items: center;
    margin-right: 14px;
  }

  &__theme-button {
    background: none;
    border: none;
    cursor: pointer;
    margin-right: 12px;
    fill: var(--light-grayish-blue-dark-mode);
  }

  &__user-icon {
    width: 24px;
    height: 24px;
    fill: var(--bright-blue);
    margin-right: 6px;
    margin-bottom: 5px;
  }

  &__log-out {
    cursor: pointer;
    color: var(--light-grayish-blue-dark-mode);
    background-color: transparent;
    border: none;
    margin-right: 16px;
    font-weight: 700;
    margin-bottom: 2px;
  }

  &__logo {
    margin: 0px;
    margin-left: 14px;
    margin-top: 5px;
    padding: 0;
  }

  &__username {
    color: var(--dark-grayish-blue-dark-mode);
    margin: 0;
    margin-right: 16px;
    font-weight: 400;
    margin-bottom: 2px;
  }
}
</style>
