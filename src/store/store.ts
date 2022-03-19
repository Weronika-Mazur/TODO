import { defineStore } from "pinia";
import FetchDB from "./fetchDB";
import {
  typeTask,
  typeTaskContent,
  typeEditMode,
  typeFilter,
} from "../types/type";

const DB_URL = "http://localhost:3030/todos";

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
      username: "" as string,
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
    setErrorMessage(value?: string) {
      this.errorMessage = value || "";
    },
    setUsername(username?: string) {
      this.username = username || "";
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
      try {
        this.setIsBusy(true);
        const data = await fetchDB.get();
        if (data) {
          this.setTaskArray(data);
          this.setErrorMessage("");

          return data;
        } else {
          throw "Couldn't get tasks";
        }
      } catch (err) {
        this.setErrorMessage("trying to get tasks");
      } finally {
        this.setIsBusy(false);
      }
    },
    async clearCompleted() {
      this.setIsBusy(true);
      const data = await fetchDB.delete();

      if (data) {
        this.fetchTaskArray();
        return data;
      } else {
        throw "Couldn't clear tasks";
      }
    },
    async addTask(newTask: typeTaskContent) {
      try {
        this.setIsBusy(true);
        const data = await fetchDB.post(newTask);

        if (data) {
          this.fetchTaskArray();
          return data;
        } else {
          throw "Couldn't add task";
        }
      } catch (err) {
        this.setErrorMessage("adding the task");
      } finally {
        this.setIsBusy(false);
      }
    },
    async changeTask(changes: typeTaskContent) {
      this.setIsBusy(true);
      const data = await fetchDB.put(changes);

      if (data) {
        this.fetchTaskArray();
        return data;
      } else {
        throw "Couldn't change task";
      }
    },
    async deleteTask(taskId: string) {
      try {
        this.setIsBusy(true);
        const data = await fetchDB.delete(taskId);
        if (data) {
          this.fetchTaskArray();
          return data;
        } else {
          throw "Couldn't delete task";
        }
      } catch (err) {
        this.setErrorMessage("deleting task");
      } finally {
        this.setIsBusy(false);
      }
    },
  },
});
