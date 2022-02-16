<template>
  <div class="task-creator">
    <button class="plus-button" @click="addItemToTaskList">
      <div class="plus-button__circle">
        <PlusIcon class="plus-icon" />
      </div>
    </button>
    <input
      type="text"
      class="task-creator__input"
      placeholder="Create a new todo..."
      v-model="text"
    />
  </div>
</template>

<script>
import PlusIcon from "../assets/PlusIcon.vue";

import { randomId } from "./helpers";

export default {
  name: "TaskCreator",
  components: {
    PlusIcon,
  },
  methods: {
    addItemToTaskList() {
      if (this.text !== "") {
        const newTask = {
          content: this.text,
          id: randomId(),
          state: "active",
          editing: false,
        };

        this.$emit("addItem", newTask);

        this.text = "";
      }
    },
  },
  data() {
    return {
      text: "",
    };
  },
};
</script>

<style lang="scss">
.task-creator {
  background-color: var(--very-dark-desaturated-blue);
  padding: 8px 20px;

  color: white;
  display: flex;
  gap: 14px;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
    rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
    rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;

  &__input {
    background-color: transparent;
    border: none;
    color: var(--light-grayish-blue-dark-mode);
    font-weight: 400;
    font-size: 18px;
    width: 100%;
    font-family: "Josefin Sans", sans-serif;
    margin: 1em;
    margin-left: 8px;

    &::placeholder {
      color: var(--dark-grayish-blue-dark-mode);
    }

    &:focus {
      outline: none;
    }
  }
}

.plus-button {
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  padding: 1px;
  background-color: var(--very-dark-grayish-blue-dark-mode);
  display: flex;
  align-items: center;
  justify-content: center;

  .plus-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    fill: var(--light-grayish-blue-dark-mode);
  }

  &:hover {
    background-image: linear-gradient(
      150deg,
      hsl(192, 100%, 67%),
      hsl(280, 87%, 65%)
    );
    .plus-icon {
      fill: white;
    }
  }

  &__circle {
    border-radius: 50%;
    padding: 6px 7px;
    background-color: var(--very-dark-desaturated-blue);
  }
}
</style>
