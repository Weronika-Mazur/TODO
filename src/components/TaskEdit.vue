<template>
  <div class="backdrop" @click="endEditing"></div>
  <div class="edit">
    <input type="text" class="edit__input task-creator__input" v-model="text" />
    <button class="edit__cross-btn" @click="cancelEdit">
      <CrossIcon class="edit__cross-btn--white" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CrossIcon from "../assets/CrossIcon.vue";
import { useStore } from "../store/store";

const store = useStore();
const emit = defineEmits(["stopEditing"]);
const props = defineProps(["content", "state", "id"]);

const text = ref(props.content);

function cancelEdit() {
  store.deactivateEditMode();
}
function endEditing() {
  emit("stopEditing", text.value);
}
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
}

.edit__cross-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  visibility: visible;
  &--white {
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
