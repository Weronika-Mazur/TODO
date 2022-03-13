<template>
  <main>
    <TaskCreator />
    <TaskList />
    <TaskFilters />
    <ErrorBanner v-if="store.errorMessage" />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TaskCreator from "./TaskCreator.vue";
import TaskList from "./TaskList.vue";
import TaskFilters from "./TaskFilters.vue";
import ErrorBanner from "./ErrorBanner.vue";
import { useStore } from "../store/store";

export default defineComponent({
  name: "TaskContainer",
  setup() {
    const store = useStore();

    return { store };
  },
  components: {
    TaskCreator,
    TaskList,
    TaskFilters,
    ErrorBanner,
  },
});
</script>
