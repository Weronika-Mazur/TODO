import { createStore } from "vuex";
import { v4 as uuidv4 } from "uuid";

const DB_URL = "http://localhost:3000/todos";

export const store = createStore({
  state() {
    return {
      taskArray: [],
      // taskArray: [
      //   {
      //     content: "Do shopping",
      //     _id: uu_idv4(),
      //     state: "active",
      //     editing: false,
      //   },
      //   {
      //     content: "Clean up",
      //     _id: uu_idv4(),
      //     state: "active",
      //     editing: false,
      //   },
      //   {
      //     content: "Eat lunch",
      //     _id: uu_idv4(),
      //     state: "completed",
      //     editing: false,
      //   },
      //   {
      //     content:
      //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor inc_id_idunt ut labore et dolore magna aliqua.",
      //     _id: uu_idv4(),
      //     state: "active",
      //     editing: false,
      //   },
      // ],
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
      state.taskArray = state.taskArray.map((task) =>
        payload._id === task._id ? { ...task, ...payload } : task
      );
      store.dispatch("changeTask", payload);
    },
    clearCompleted(state) {
      state.taskArray = state.taskArray.filter(
        ({ state }) => state === "active"
      );
      store.dispatch("clearCompleted");
    },
    deleteTask(state, taskId) {
      state.taskArray = state.taskArray.filter(({ _id }) => _id !== taskId);
      store.dispatch("deleteTask", taskId);
    },
    addTask(state, newTask) {
      state.taskArray = [...state.taskArray, newTask];
      store.dispatch("addTask", newTask);
    },
    setTaskArray(state, taskArray) {
      state.taskArray = taskArray;
    },
  },
  actions: {
    fetchTaskArray() {
      fetch(DB_URL)
        .then((response) => response.json())
        .then((data) => {
          store.commit("setTaskArray", data);
        });
    },
    clearCompleted() {
      fetch(DB_URL, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("success");
          store.dispatch("fetchTaskArray");
        });
    },
    addTask(context, newTask) {
      fetch(DB_URL, {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("success");
          store.dispatch("fetchTaskArray");
        });
    },
    changeTask(context, changes) {
      const url = `${DB_URL}/${changes._id}`;

      fetch(url, {
        method: "PUT",
        body: JSON.stringify(changes),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("success");
          store.dispatch("fetchTaskArray");
        });
    },
    deleteTask(context, taskId) {
      const url = `${DB_URL}/${taskId}`;

      fetch(url, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("success");
          store.dispatch("fetchTaskArray");
        });
    },
  },
});
