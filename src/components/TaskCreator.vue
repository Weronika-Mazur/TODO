<template>
  <div class="task-creator">
    <button class="check-button" @click="addItemToTaskList">
      <div class="check-circle">
        <img src="./../assets/icon-check.svg" />
      </div>
    </button>
    <input
      type="text"
      class="task-creator-input"
      placeholder="Create a new todo..."
      v-model="text"
    />
  </div>
</template>

<script>
export default {
  name: "TaskCreator",
  methods: {
    toggleChecked(e) {
      e.currentTarget.classList.toggle("checked");
    },
    addItemToTaskList(event) {
      if (this.text !== "") {
        this.$emit("addItem", this.text);
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

<style>
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
}

.task-creator-input {
  background-color: transparent;
  border: none;
  color: var(--light-grayish-blue-dark-mode);
  font-weight: 400;
  font-size: 18px;
  width: 100%;
  font-family: "Josefin Sans", sans-serif;
  margin: 1em;
  margin-left: 8px;
}

.task-creator-input::placeholder {
  color: var(--dark-grayish-blue-dark-mode);
}

.task-creator-input:focus {
  outline: none;
}

.check-button {
  border-radius: 50%;
  padding: 1px;
  background-color: var(--very-dark-grayish-blue-dark-mode);
  display: flex;
  align-items: center;
  justify-content: center;
}

.check-button:hover {
  background-image: linear-gradient(
    150deg,
    hsl(192, 100%, 67%),
    hsl(280, 87%, 65%)
  );
}

.check-circle {
  border-radius: 50%;
  padding: 4px 5px;
  background-color: var(--very-dark-desaturated-blue);
}

.checked .check-circle {
  background-image: linear-gradient(
    150deg,
    hsl(192, 100%, 67%),
    hsl(280, 87%, 65%)
  );
}

.check-circle img {
  visibility: hidden;
}

.checked img {
  visibility: visible;
}

.checked {
  background-image: linear-gradient(
    150deg,
    hsl(192, 100%, 67%),
    hsl(280, 87%, 65%)
  );
}
</style>
