<template>
  <article class="task-list">
    <section class="task-list-items" v-for="task in taskArray">
      <TaskItem
        :state="task.state"
        :content="task.content"
        :key="task.id"
        @toggleState="toggleItemState(task)"
        @deleteTask="deleteTaskItem(task.id)"
      />
    </section>
    <section class="nav-bar">
      <p>{{ itemsLeft }}</p>
      <ul class="nav-bar-filter">
        <li
          v-for="filter in filterArray"
          :class="{ 'nav-bar-filter-active': isActiveFilter(filter.type) }"
          @click="setFilter(filter.type)"
        >
          {{ filter.desc }}
        </li>
      </ul>
      <p @click="clearCompleted" class="nav-bar-clear-completed">
        Clear Completed
      </p>
    </section>
  </article>
</template>

<script>
import TaskItem from "./TaskItem.vue";

export default {
  name: "TaskList",
  props: ["taskArray", "taskFilter", "itemsCounter"],
  components: {
    TaskItem,
  },
  data() {
    return {
      filterArray: [
        {
          type: "all",
          desc: "All",
        },
        {
          type: "active",
          desc: "Active",
        },
        {
          type: "completed",
          desc: "Completed",
        },
      ],
    };
  },
  methods: {
    toggleItemState(task) {
      task.state === "active"
        ? (task.state = "completed")
        : (task.state = "active");
    },
    deleteTaskItem(taskId) {
      this.$emit("deleteTask", taskId);
    },
    isActiveFilter(filterType) {
      return this.taskFilter === filterType;
    },
    setFilter(filterType) {
      this.$emit("changeFilter", filterType);
    },
    clearCompleted() {
      this.$emit("clearComplited");
    },
  },
  computed: {
    itemsLeft() {
      return `${this.itemsCounter} items left`;
    },
  },
};
</script>

<style>
.task-list {
  background-color: var(--very-dark-desaturated-blue);
  display: flex;
  flex-direction: column;
  margin-top: 22px;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
    rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
    rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
}

.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 6px 18px;
  font-size: 14px;
  color: var(--dark-grayish-blue-dark-mode);
}

.nav-bar-filter {
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
}

.nav-bar-filter li {
  list-style-type: none;
  margin: 0px 4px;
}

.nav-bar-filter li:hover {
  cursor: pointer;
  color: var(--light-grayish-blue-hover);
}

.nav-bar-filter-active {
  color: var(--bright-blue);
}

.nav-bar-filter-active:hover {
  cursor: default !important;
  color: var(--bright-blue) !important;
}

.nav-bar-clear-completed:hover {
  cursor: pointer;
  color: var(--light-grayish-blue-hover);
}
</style>
