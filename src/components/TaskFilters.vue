<template>
  <section class="nav-bar">
    <p>{{ itemsLeft }}</p>
    <ul class="nav-bar__filter">
      <li
        v-for="filter in filterArray"
        class="nav-bar__option"
        :class="{ 'nav-bar__option--active': isActiveFilter(filter.type) }"
        @click="setFilter(filter.type)"
      >
        {{ filter.desc }}
      </li>
    </ul>
    <p @click="clearCompleted" class="nav-bar__clear-completed">
      Clear Completed
    </p>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "../store/store";
import { typeFilter } from "../types/type";

export default defineComponent({
  name: "TaskFilters",
  setup() {
    const store = useStore();

    return { store };
  },
  data() {
    return {
      filterArray: [
        {
          type: "all" as typeFilter,
          desc: "All",
        },
        {
          type: "active" as typeFilter,
          desc: "Active",
        },
        {
          type: "completed" as typeFilter,
          desc: "Completed",
        },
      ],
    };
  },
  methods: {
    isActiveFilter(filterType: typeFilter): boolean {
      return this.store.taskFilter === filterType;
    },
    setFilter(filterType: typeFilter) {
      this.store.setFilter(filterType);
    },
    clearCompleted() {
      this.store.clearCompleted().catch((err) => {
        console.log(err);
        this.store.setIsBusy(false);
        this.store.setErrorMessage("clearing completed tasks");
      });
    },
  },
  computed: {
    itemsLeft(): string {
      return `${this.store.itemsCounter} items left`;
    },
  },
});
</script>

<style lang="scss">
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 18px;
  font-size: 14px;
  color: var(--dark-grayish-blue-dark-mode);
  background-color: var(--very-dark-desaturated-blue);
  margin-top: 0px;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
    rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
    rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
}

.nav-bar__filter {
  display: flex;
  justify-content: space-between;
  padding-left: 14px;
}

.nav-bar__option {
  list-style-type: none;
  margin: 0px 4px;

  &:hover {
    cursor: pointer;
    color: var(--light-grayish-blue-hover);
  }

  &--active {
    color: var(--bright-blue);

    &:hover {
      cursor: default !important;
      color: var(--bright-blue) !important;
    }
  }
}

.nav-bar__clear-completed:hover {
  cursor: pointer;
  color: var(--light-grayish-blue-hover);
}
</style>
