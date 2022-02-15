<template>
  <main>
    <TaskCreator @addItem="addNewTask" />
    <TaskList
      :task-array="taskArrayWithFilters"
      :task-filter="taskFilter"
      :items-counter="itemsCounter"
      @changeFilter="changeFilter"
      @deleteTask="deleteTask"
      @clearComplited="clearComplited"
    />
    <!-- <TaskFilters /> -->
    <!-- TODO: dzikie małpy - przenieść filtry -->
  </main>
</template>

<script>
import TaskCreator from "./TaskCreator.vue";
import TaskList from "./TaskList.vue";

import { randomId } from "./helpers";

export default {
  name: "TaskContainer",
  components: {
    TaskCreator,
    TaskList,
  },
  data() {
    return {
      taskArray: [
        { content: "Do shopping", id: randomId(), state: "active" },
        { content: "Clean up", id: randomId(), state: "active" },
        { content: "Eat lunch", id: randomId(), state: "completed" },
        {
          content:
            "jnkjewnfkjew jfnwkjenfkjwe fnwjenf jjdwkjdkew jnwkdjnkewndknjew jdnwkjendkewndjw ndjwnekdnjewkdnew jdnwkjendkjewn ndjwneknw",
          id: randomId(),
          state: "active",
        },
      ],
      taskFilter: "all",
    };
  },
  computed: {
    taskArrayWithFilters() {
      return this.taskFilter === "all"
        ? this.taskArray
        : this.taskArray.filter((task) => task.state === this.taskFilter);
    },
    itemsCounter() {
      return this.taskArray.filter((task) => task.state === "active").length;
    },
  },
  methods: {
    addNewTask(newTask) {
      this.taskArray = [...this.taskArray, newTask];
    },
    changeFilter(filterType) {
      this.taskFilter = filterType;
    },
    deleteTask(taskId) {
      this.taskArray = this.taskArray.filter(({ id }) => id !== taskId);
    },
    clearComplited() {
      this.taskArray = this.taskArray.filter((task) => task.state === "active");
    },
  },
};
</script>
