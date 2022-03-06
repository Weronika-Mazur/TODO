import { createStore } from "vuex";
import FetchDB from "./fetchDB";

const DB_URL = "http://localhost:3000/todos";

const fetchDB = new FetchDB(DB_URL);

export const store = createStore({
  state() {
    return {
      taskArray: [],
      taskFilter: "all",
      isBusy: true,
      errorMessage: "",
      editMode: {
        active: false,
        id: "",
      },
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
    setTaskArray(state, taskArray) {
      state.taskArray = taskArray;
    },
    setIsBusy(state, value) {
      state.isBusy = value;
    },
    setErrorMessage(state, value) {
      state.errorMessage = value;
    },
    activateEditMode(state, id) {
      state.editMode = {
        active: true,
        id: id,
      };
    },
    deactivateEditMode(state) {
      state.editMode = {
        active: false,
        id: "",
      };
    },
    // changeTask(state, payload) {
    //   store.commit("setIsBusy", true);
    //   // state.taskArray = state.taskArray.map((task) =>
    //   //   payload._id === task._id ? { ...task, ...payload } : task
    //   // );
    //   store.dispatch("changeTask", payload);
    // },
    // clearCompleted(state) {
    //   store.commit("setIsBusy", true);
    //   // state.taskArray = state.taskArray.filter(
    //   //   ({ state }) => state === "active"
    //   // );
    //   store.dispatch("clearCompleted");
    // },
    // deleteTask(state, taskId) {
    //   store.commit("setIsBusy", true);
    //   // state.taskArray = state.taskArray.filter(({ _id }) => _id !== taskId);
    //   store.dispatch("deleteTask", taskId);
    // },
    // addTask(state, newTask) {
    //   // state.taskArray = [...state.taskArray, newTask];
    //   store.commit("setIsBusy", true);
    //   store.dispatch("addTask", newTask);
    // },
  },
  actions: {
    async fetchTaskArray(context) {
      context.commit("setIsBusy", true);
      const data = await fetchDB.get();

      context.commit("setTaskArray", data);
      context.commit("setIsBusy", false);

      context.commit("setErrorMessage", "");

      return data;
    },
    async clearCompleted(context) {
      context.commit("setIsBusy", true);
      const data = await fetchDB.delete();

      context.dispatch("fetchTaskArray");

      return data;
    },
    async addTask(context, newTask) {
      context.commit("setIsBusy", true);
      const data = await fetchDB.post(newTask);

      context.dispatch("fetchTaskArray");

      return data;
    },
    async changeTask(context, changes) {
      context.commit("setIsBusy", true);
      const data = await fetchDB.put(changes);

      context.dispatch("fetchTaskArray");

      return data;
    },
    async deleteTask(context, taskId) {
      context.commit("setIsBusy", true);
      const data = await fetchDB.delete(taskId);

      context.dispatch("fetchTaskArray");

      return data;
    },
  },
});
