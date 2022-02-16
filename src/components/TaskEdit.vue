<template>
  <div class="backdrop" @click="endEditing"></div>
  <div class="edit">
    <input
      type="text"
      class="edit__input task-creator__input"
      ref="editInput"
      v-model="text"
    />
    <button class="cross-button" @click="cancelEdit">
      <CrossIcon class="cross-button--white" />
    </button>
  </div>
</template>

<script>
import CrossIcon from "../assets/CrossIcon.vue";

export default {
  name: "TaskEdit",
  emits: ["stopEditing"],
  methods: {
    cancelEdit() {
      this.text = this.content;
      this.endEditing();
    },
    endEditing() {
      this.$emit("stopEditing", this.text);
    },
  },
  data() {
    return {
      text: this.content,
    };
  },
  props: ["content", "state", "id"],
  components: { CrossIcon },
};
</script>

<style lang="scss" scoped>
.edit {
  background-color: var(--very-dark-grayish-blue-dark-mode-second);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
  padding: 8px 20px;
  border-bottom: solid 1px var(--very-dark-grayish-blue-dark-mode-second);
  z-index: 2;
  position: relative;

  .item__p {
    color: var(--light-grayish-blue-dark-mode);
    font-weight: 400;
    font-size: 18px;
    width: 100%;
    margin-left: 10px;
  }
}

.cross-button {
  visibility: visible;
  .cross-button--white {
    fill: var(--light-grayish-blue-dark-mode);
  }
}

.backdrop {
  z-index: 1;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
</style>
