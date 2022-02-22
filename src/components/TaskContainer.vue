<template>
  <main>
    <TaskCreator />
    <TaskList />
    <TaskFilters />
  </main>
</template>

<script>
import TaskCreator from "./TaskCreator.vue";
import TaskList from "./TaskList.vue";
import TaskFilters from "./TaskFilters.vue";

export default {
  name: "TaskContainer",
  components: {
    TaskCreator,
    TaskList,
    TaskFilters,
  },
};
</script>
