<template>
  <main>
    <TaskCreator />
    <TaskList />
    <TaskFilters />
    <ErrorBanner v-if="store.errorMessage" />
  </main>
</template>

<script setup lang="ts">
import TaskCreator from "./TaskCreator.vue";
import TaskList from "./TaskList.vue";
import TaskFilters from "./TaskFilters.vue";
import ErrorBanner from "./ErrorBanner.vue";
import { useStore } from "../store/store";

const store = useStore();
</script>
