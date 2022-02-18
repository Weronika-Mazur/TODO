<template>
  <div
    class="item"
    :class="{
      'item--task-completed': state === `completed`,
    }"
  >
    <button
      class="item__check-button"
      :class="{ checked: state === 'completed' }"
      @click="toggleChecked"
    >
      <div class="item__circle">
        <CheckIcon class="item__check-icon" />
      </div>
    </button>
    <p class="item__text">{{ content }}</p>
    <button class="item__edit-button" @click="this.$emit('editTask')">
      <EditIcon />
    </button>
    <button class="item__cross-button" @click="this.$emit('deleteTask')">
      <CrossIcon />
    </button>
  </div>
</template>

<script>
import CheckIcon from "../assets/CheckIcon.vue";
import CrossIcon from "../assets/CrossIcon.vue";
import EditIcon from "../assets/EditIcon.vue";

export default {
  name: "TaskItem",
  methods: {
    toggleChecked(e) {
      this.$emit("toggleState");
    },
  },
  props: ["content", "state", "id"],
  components: {
    CheckIcon,
    CrossIcon,
    EditIcon,
  },
};
</script>

<style lang="scss">
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
  padding: 8px 20px;
  border-bottom: solid 1px var(--very-dark-grayish-blue-dark-mode-second);

  .item__text {
    color: var(--light-grayish-blue-dark-mode);
    font-weight: 400;
    font-size: 18px;
    width: 100%;
    margin-left: 10px;
  }

  &:hover {
    .item__cross-button,
    .item__edit-button {
      visibility: visible;
    }
  }

  &__circle {
    border-radius: 50%;
    padding: 6px 7px;
    background-color: var(--very-dark-desaturated-blue);
  }

  &__check-icon {
    visibility: hidden;
  }
}

.item--task-completed {
  .item__text {
    color: var(--very-dark-grayish-blue-dark-mode-second);
    text-decoration: line-through;
  }
}

.item__check-button {
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  padding: 1px;
  background-color: var(--very-dark-grayish-blue-dark-mode);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-image: linear-gradient(
      150deg,
      hsl(192, 100%, 67%),
      hsl(280, 87%, 65%)
    );

    .item__check-icon {
      visibility: visible;
    }
  }
}

.checked {
  background-image: linear-gradient(
    150deg,
    hsl(192, 100%, 67%),
    hsl(280, 87%, 65%)
  );

  .item__circle {
    background-image: linear-gradient(
      150deg,
      hsl(192, 100%, 67%),
      hsl(280, 87%, 65%)
    );
  }

  .item__check-icon {
    visibility: visible;
  }
}

.item__cross-button,
.item__edit-button {
  background: none;
  border: none;
  cursor: pointer;
  visibility: hidden;
  padding: 0;
}
</style>
