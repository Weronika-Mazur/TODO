<template>
  <main>
    <TaskCreator />
    <TaskList />
    <TaskFilters />
    <ErrorBanner v-if="this.$store.state.errorMessage" />
  </main>
</template>

<script>
import TaskCreator from "./TaskCreator.vue";
import TaskList from "./TaskList.vue";
import TaskFilters from "./TaskFilters.vue";
import ErrorBanner from "./ErrorBanner.vue";

export default {
  name: "TaskContainer",
  data() {
    return {};
  },
  components: {
    TaskCreator,
    TaskList,
    TaskFilters,
    ErrorBanner,
  },
};
</script>
