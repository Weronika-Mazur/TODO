<template>
  <section class="nav-bar">
    <p>{{ itemsLeft }}</p>
    <ul class="nav-bar__filter">
      <li
        v-for="filter in filterArray"
        class="nav-bar__li"
        :class="{ 'nav-bar__filter--active': isActiveFilter(filter.type) }"
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

<script>
export default {
  name: "TaskFilters",
  props: ["taskFilter", "itemsCounter"],
  data() {
    return {
      filterArray: [
        {
          type: "all",
          desc: "All",
        },
        {
          type: "active",
          desc: "Active",
        },
        {
          type: "completed",
          desc: "Completed",
        },
      ],
    };
  },
  methods: {
    isActiveFilter(filterType) {
      return this.taskFilter === filterType;
    },
    setFilter(filterType) {
      this.$emit("changeFilter", filterType);
    },
    clearCompleted() {
      this.$emit("clearCompleted");
    },
  },
  computed: {
    itemsLeft() {
      return `${this.itemsCounter} items left`;
    },
  },
};
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

  &--active {
    color: var(--bright-blue);

    &:hover {
      cursor: default !important;
      color: var(--bright-blue) !important;
    }
  }
}

.nav-bar__li {
  list-style-type: none;
  margin: 0px 4px;

  &:hover {
    cursor: pointer;
    color: var(--light-grayish-blue-hover);
  }
}

.nav-bar__clear-completed:hover {
  cursor: pointer;
  color: var(--light-grayish-blue-hover);
}
</style>
