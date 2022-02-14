<template>
  <div
    class="item"
    :class="{
      'task-active': state === `active`,
      'task-completed': state === `completed`,
    }"
  >
    <button
      class="check-button"
      :class="{ checked: state === 'completed' }"
      @click="toggleChecked"
    >
      <div class="check-circle">
        <img src="./../assets/icon-check.svg" />
      </div>
    </button>
    <p>{{ content }}</p>
    <button class="cross-button" @click="this.$emit('deleteTask')">
      <img src="./../assets/icon-cross.svg" />
    </button>
  </div>
</template>

<script>
export default {
  name: "TaskItem",
  methods: {
    toggleChecked(e) {
      this.$emit("toggleState");
    },
  },
  props: ["content", "state", "id"],
};
</script>

<style>
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
  padding: 8px 20px;
  border-bottom: solid 1px var(--very-dark-grayish-blue-dark-mode-second);
}

.item p {
  color: var(--light-grayish-blue-dark-mode);
  font-weight: 400;
  font-size: 18px;
  width: 100%;
  margin-left: 10px;
}

.cross-button img {
  visibility: hidden;
}

.item:hover .cross-button img {
  visibility: visible;
}

.task-completed p {
  color: var(--very-dark-grayish-blue-dark-mode-second);
  text-decoration: line-through;
}
</style>
