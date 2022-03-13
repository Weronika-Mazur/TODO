<template>
  <section class="task-list">
    <div v-for="task in taskArray">
      <TaskItem
        v-if="!isEditModeActive(task._id)"
        :state="task.state"
        :content="task.content"
        :key="task._id"
        @toggleState="toggleItemState(task)"
        @deleteTask="deleteTaskItem(task._id)"
        @editTask="editTaskItem(task._id)"
      />
      <TaskEdit
        v-else
        :state="task.state"
        :content="task.content"
        :key="task._id + 'edit'"
        @stopEditing="(taskText: string) => endEditing(task._id, taskText)"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TaskItem from "./TaskItem.vue";
import TaskEdit from "./TaskEdit.vue";
import { useStore } from "../store/store";
import { typeTask } from "../types/type";

export default defineComponent({
  name: "TaskList",
  setup() {
    const store = useStore();

    return { store };
  },
  components: {
    TaskItem,
    TaskEdit,
  },
  computed: {
    taskArray(): typeTask[] {
      return this.store.taskArrayWithFilters;
    },
  },
  methods: {
    toggleItemState(task: typeTask) {
      const taskStatus = task.state === "active" ? "completed" : "active";
      this.store.changeTask({
        _id: task._id,
        state: taskStatus,
      });
    },
    deleteTaskItem(taskId: string) {
      this.store.deleteTask(taskId).catch((err) => {
        console.log(err);
        this.store.setIsBusy(false);
        this.store.setErrorMessage("deleting task");
      });
    },
    isEditModeActive(taskId: string) {
      return taskId === this.store.editMode.id;
    },
    endEditing(taskId: string, taskText: string) {
      this.store
        .changeTask({
          _id: taskId,
          content: taskText,
        })
        .then(() => {
          this.store.deactivateEditMode();
        })
        .catch((err) => {
          console.log(err);
          this.store.setIsBusy(false);
          this.store.setErrorMessage("editing task");
        });
    },
    editTaskItem(taskId: string) {
      this.store.activateEditMode(taskId);
    },
  },
});
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
