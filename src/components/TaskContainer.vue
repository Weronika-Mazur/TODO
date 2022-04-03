<template>
  <main>
    <TaskCreator />
    <TaskList />
    <TaskFilters />
  </main>
</template>

<script setup lang="ts">
import TaskCreator from "./TaskCreator.vue";
import TaskList from "./TaskList.vue";
import TaskFilters from "./TaskFilters.vue";
</script>
