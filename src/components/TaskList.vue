<template>
  <article class="task-list">
    <section class="task-list-items" v-for="(task, index) in taskArray">
      <TaskItem
        :state="task.state"
        :content="task.content"
        :key="task.id"
        @toggleState="toggleItemState(task)"
        @deleteTask="deleteTaskItem(index)"
      ></TaskItem>
    </section>
    <section class="nav-bar">
      <p>{{ itemsLeft }} items left</p>
      <ul class="nav-bar-filter" @click="changeFilter">
        <li :class="{ 'nav-bar-filter-active': this.taskFilter === 'all' }">
          All
        </li>
        <li :class="{ 'nav-bar-filter-active': this.taskFilter === 'active' }">
          Active
        </li>
        <li
          :class="{ 'nav-bar-filter-active': this.taskFilter === 'completed' }"
        >
          Completed
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
  props: ["addNewItem", "newItemText"],
  components: {
    TaskItem,
  },
  data() {
    return {
      taskArrayAll: [
        { content: "Do shopping", id: 1, state: "active" },
        { content: "Clean up", id: 2, state: "active" },
        { content: "Eat lunch", id: 3, state: "completed" },
        {
          content:
            "jnkjewnfkjew jfnwkjenfkjwe fnwjenf jjdwkjdkew jnwkdjnkewndknjew jdnwkjendkewndjw ndjwnekdnjewkdnew jdnwkjendkjewn ndjwneknw",
          id: 4,
          state: "active",
        },
      ],
      taskFilter: "all",
      idCount: 5,
    };
  },
  methods: {
    toggleItemState(task) {
      if (task.state == "active") {
        task.state = "completed";
      } else {
        task.state = "active";
      }
    },
    deleteTaskItem(index) {
      this.taskArrayAll.splice(index, 1);
    },
    changeFilter(e) {
      if (e.tartget !== e.currentTarget) {
        this.taskFilter = e.target.textContent.toLowerCase().replace(/\s/g, "");
      }
      console.log(this.taskFilter);
    },
    clearCompleted() {
      this.taskArrayAll = this.taskArrayAll.filter(
        (task) => task.state === "active"
      );
    },
    addTask(taskContent) {
      this.taskArrayAll.push({
        content: taskContent,
        id: this.idCount,
        state: "active",
      });
      this.idCount++;
    },
  },
  computed: {
    taskArray() {
      if (this.taskFilter === "all") {
        return this.taskArrayAll;
      } else {
        return this.taskArrayAll.filter(
          (task) => task.state === this.taskFilter
        );
      }
    },
    itemsLeft() {
      return this.taskArrayAll.filter((task) => task.state === "active").length;
    },
  },
  watch: {
    addNewItem(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.addTask(this.newItemText);
      }
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
