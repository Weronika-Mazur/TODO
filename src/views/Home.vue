<template>
  <NavBar />

  <div class="container">
    <TaskContainer />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import NavBar from "../components/NavBar.vue";
import TaskContainer from "../components/TaskContainer.vue";
import { useStore } from "../store/store";
import jwt_decode from "jwt-decode";

const store = useStore();
onMounted(() => {
  store.fetchTaskArray();
  const token = localStorage.getItem("jwt");
  if (token) {
    const decoded: { email: string } = jwt_decode(token);
    store.setUsername(decoded.email);
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
