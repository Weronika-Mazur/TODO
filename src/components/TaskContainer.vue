<template>
  <main>
    <TaskCreator @addItem="addNewTask" />
    <TaskList
      :task-array="taskArrayWithFilters"
      @deleteTask="deleteTask"
      @stopItemEditing="stopEditing"
      @editTask="editTask"
    />
    <TaskFilters
      :task-filter="taskFilter"
      :items-counter="itemsCounter"
      @changeFilter="changeFilter"
      @clearCompleted="clearCompleted"
    />
  </main>
</template>

<script>
import TaskCreator from "./TaskCreator.vue";
import TaskList from "./TaskList.vue";
import TaskFilters from "./TaskFilters.vue";

import { randomId } from "./helpers";

export default {
  name: "TaskContainer",
  components: {
    TaskCreator,
    TaskList,
    TaskFilters,
  },
  data() {
    return {
      taskArray: [
        {
          content: "Do shopping",
          id: randomId(),
          state: "active",
          editing: false,
        },
        {
          content: "Clean up",
          id: randomId(),
          state: "active",
          editing: false,
        },
        {
          content: "Eat lunch",
          id: randomId(),
          state: "completed",
          editing: false,
        },
        {
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          id: randomId(),
          state: "active",
          editing: false,
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
      console.log(this.taskArray);
    },
    changeFilter(filterType) {
      this.taskFilter = filterType;
    },
    deleteTask(taskId) {
      this.taskArray = this.taskArray.filter(({ id }) => id !== taskId);
    },
    clearCompleted() {
      this.taskArray = this.taskArray.filter((task) => task.state === "active");
    },
    stopEditing(taskId, taskText) {
      this.taskArray = this.taskArray.map((task) => {
        return taskId === task.id
          ? { ...task, content: taskText, editing: false }
          : task;
      });
    },
    editTask(taskId) {
      this.taskArray = this.taskArray.map((task) => {
        return taskId === task.id ? { ...task, editing: true } : task;
      });
    },
  },
};
</script>
