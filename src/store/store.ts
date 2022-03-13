import { defineStore } from "pinia";
import FetchDB from "./fetchDB";
import {
  typeTask,
  typeTaskContent,
  typeEditMode,
  typeFilter,
} from "../types/type";

const DB_URL = "http://localhost:3000/todos";

const fetchDB = new FetchDB(DB_URL);

export const useStore = defineStore("main", {
  state: () => {
    return {
      taskArray: [] as typeTask[],
      taskFilter: "all" as typeFilter,
      isBusy: true,
      errorMessage: "",
      editMode: {
        active: false,
        id: "",
      } as typeEditMode,
    };
  },
  getters: {
    taskArrayWithFilters(state) {
      return state.taskFilter === "all"
        ? state.taskArray
        : state.taskArray.filter(
            (task: typeTask) => task.state === state.taskFilter
          );
    },
    itemsCounter(state): number {
      return state.taskArray.filter((task: typeTask) => task.state === "active")
        .length;
    },
  },
  actions: {
    setFilter(filterType: typeFilter) {
      this.taskFilter = filterType;
    },
    setTaskArray(taskArray: typeTask[]) {
      this.taskArray = taskArray;
    },
    setIsBusy(value: boolean) {
      this.isBusy = value;
    },
    setErrorMessage(value: string) {
      this.errorMessage = value;
    },
    activateEditMode(id: string) {
      this.editMode = {
        active: true,
        id: id,
      };
    },
    deactivateEditMode() {
      this.editMode = {
        active: false,
        id: "",
      };
    },
    async fetchTaskArray() {
      this.setIsBusy(true);
      const data = await fetchDB.get();

      this.setTaskArray(data);
      this.setIsBusy(false);

      this.setErrorMessage("");

      return data;
    },
    async clearCompleted() {
      this.setIsBusy(true);
      const data = await fetchDB.delete();

      this.fetchTaskArray();

      return data;
    },
    async addTask(newTask: typeTaskContent) {
      this.setIsBusy(true);
      const data = await fetchDB.post(newTask);

      this.fetchTaskArray();

      return data;
    },
    async changeTask(changes: typeTaskContent) {
      this.setIsBusy(true);
      const data = await fetchDB.put(changes);

      this.fetchTaskArray();

      return data;
    },
    async deleteTask(taskId: string) {
      this.setIsBusy(true);
      const data = await fetchDB.delete(taskId);

      this.fetchTaskArray();

      return data;
    },
  },
});
