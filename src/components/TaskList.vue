<template>
  <section class="task-list">
    <TransitionGroup
      enter-active-class="animate__animated animate__fadeInUp"
      leave-active-class="animate__animated animate__fadeOutDown"
    >
      <div v-for="task in taskArray" :key="task._id">
        <TaskItem
          v-if="!isEditModeActive(task._id)"
          :state="task.state"
          :content="task.content"
          @toggleState="toggleItemState(task)"
          @deleteTask="deleteTaskItem(task._id)"
          @editTask="editTaskItem(task._id)"
        />
        <TaskEdit
          v-else
          :state="task.state"
          :content="task.content"
          @stopEditing="(taskText: string) =>
        endEditing(task._id, taskText)"
        />
      </div>
    </TransitionGroup>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import TaskItem from "./TaskItem.vue";
import TaskEdit from "./TaskEdit.vue";
import { useTodoStore } from "../store/todoStore";
import { Task } from "../types/type";

const store = useTodoStore();

const taskArray = computed(() => store.taskArrayWithFilters);

function toggleItemState(task: Task) {
  const taskStatus = task.state === "active" ? "completed" : "active";
  store
    .changeTask({
      _id: task._id,
      state: taskStatus,
    })
    .catch((err) => {
      console.log(err);
      store.setIsLoading(false);
      store.setErrorMessage("changing tasks state");
    });
}
function deleteTaskItem(taskId: string) {
  store.deleteTask(taskId);
}
function isEditModeActive(taskId: string) {
  return taskId === store.editMode.id;
}
function endEditing(taskId: string, taskText: string) {
  store
    .changeTask({
      _id: taskId,
      content: taskText,
    })
    .then(() => {
      store.deactivateEditMode();
    })
    .catch((err) => {
      console.log(err);
      store.setIsLoading(false);
      store.setErrorMessage("editing task");
    });
}
function editTaskItem(taskId: string) {
  store.activateEditMode(taskId);
}
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
