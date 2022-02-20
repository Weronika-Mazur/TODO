import { createStore } from "vuex";
import { v4 as uuidv4 } from "uuid";

export const store = createStore({
  state() {
    return {
      taskArray: [
        {
          content: "Do shopping",
          id: uuidv4(),
          state: "active",
          editing: false,
        },
        {
          content: "Clean up",
          id: uuidv4(),
          state: "active",
          editing: false,
        },
        {
          content: "Eat lunch",
          id: uuidv4(),
          state: "completed",
          editing: false,
        },
        {
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          id: uuidv4(),
          state: "active",
          editing: false,
        },
      ],
      taskFilter: "all",
    };
  },
  getters: {
    taskArrayWithFilters(state) {
      return state.taskFilter === "all"
        ? state.taskArray
        : state.taskArray.filter((task) => task.state === state.taskFilter);
    },
    itemsCounter(state) {
      return state.taskArray.filter((task) => task.state === "active").length;
    },
  },
  mutations: {
    setFilter(state, filterType) {
      state.taskFilter = filterType;
    },
    changeTask(state, payload) {
      state.taskArray = state.taskArray.map((task) => {
        return payload.id === task.id ? { ...task, ...payload } : task;
      });
    },
    clearCompleted(state) {
      state.taskArray = state.taskArray.filter(
        (task) => task.state === "active"
      );
    },
    deleteTask(state, taskId) {
      state.taskArray = state.taskArray.filter(({ id }) => id !== taskId);
    },
    addTask(state, newTask) {
      state.taskArray = [...state.taskArray, newTask];
    },
  },
});
