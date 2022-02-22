<template>
  <section class="task-list">
    <div v-for="task in taskArray">
      <TaskItem
        v-if="!task.editing"
        :state="task.state"
        :content="task.content"
        :key="task.id"
        @toggleState="toggleItemState(task)"
        @deleteTask="deleteTaskItem(task.id)"
        @editTask="editTaskItem(task.id)"
      />
      <TaskEdit
        v-else
        :state="task.state"
        :content="task.content"
        :key="task.id"
        @stopEditing="(taskText) => endEditing(task.id, taskText)"
      />
    </div>
  </section>
</template>

<script>
import TaskItem from "./TaskItem.vue";
import TaskEdit from "./TaskEdit.vue";

export default {
  name: "TaskList",
  components: {
    TaskItem,
    TaskEdit,
  },
  computed: {
    taskArray() {
      return this.$store.getters.taskArrayWithFilters;
    },
  },
  methods: {
    toggleItemState(task) {
      const taskStatus = task.state === "active" ? "completed" : "active";
      this.$store.commit("changeTask", {
        id: task.id,
        state: taskStatus,
      });
    },
    deleteTaskItem(taskId) {
      this.$store.commit("deleteTask", taskId);
    },
    endEditing(taskId, taskText) {
      this.$store.commit("changeTask", {
        id: taskId,
        content: taskText,
        editing: false,
      });
    },
    editTaskItem(taskId) {
      this.$store.commit("changeTask", {
        id: taskId,
        editing: true,
      });
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
</style>
