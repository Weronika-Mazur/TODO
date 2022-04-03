<template>
  <NavBar />

  <div class="container">
    <TaskContainer />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import jwt_decode from "jwt-decode";
import { useRouter } from "vue-router";

import NavBar from "../components/NavBar.vue";
import TaskContainer from "../components/TaskContainer.vue";

import { useTodoStore } from "../store/todoStore";
import { useUserStore } from "../store/userStore";

const router = useRouter();
const todoStore = useTodoStore();
const userStore = useUserStore();

onMounted(() => {
  const token = localStorage.getItem("jwt");
  if (token) {
    const decoded: { _id: string; email: string } = jwt_decode(token);
    todoStore.fetchTaskArray();
    userStore.setUsername(decoded.email);
  } else {
    router.push({ name: "Login" });
  }
});
</script>

<style lang="scss">
.container {
  width: 640px;
  margin-top: 166px;
  margin-bottom: 74px;
}
</style>
