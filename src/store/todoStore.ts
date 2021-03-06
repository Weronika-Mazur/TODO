import { defineStore } from "pinia";
import { todoApi } from "../api/todoAPI";
import { Task, TaskContent, EditMode, Filter } from "../types/type";

interface State {
  taskArray: Task[];
  taskFilter: Filter;
  isLoading: boolean;
  errorMessage: string;
  editMode: EditMode;
}

export const useTodoStore = defineStore("main", {
  state: () => {
    return {
      taskArray: [],
      taskFilter: "all",
      isLoading: true,
      errorMessage: "",
      editMode: {
        active: false,
        id: "",
      },
    } as State;
  },
  getters: {
    taskArrayWithFilters(state) {
      return state.taskFilter === "all"
        ? state.taskArray
        : state.taskArray.filter(
            (task: Task) => task.state === state.taskFilter
          );
    },
    itemsCounter(state): number {
      return state.taskArray.filter((task: Task) => task.state === "active")
        .length;
    },
  },
  actions: {
    setFilter(filterType: Filter) {
      this.taskFilter = filterType;
    },
    setTaskArray(taskArray?: Task[]) {
      this.taskArray = taskArray || [];
    },
    setIsLoading(value: boolean) {
      this.isLoading = value;
    },
    setErrorMessage(value?: string) {
      this.errorMessage = value || "";
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
        this.setIsLoading(true);
        const data = await todoApi.getTodoList();

        if (!data) {
          throw "Couldn't get tasks";
        }

        this.setTaskArray(data);
        this.setErrorMessage("");

        return data;
      } catch (err) {
        this.setErrorMessage("trying to get tasks");
      } finally {
        this.setIsLoading(false);
      }
    },
    async clearCompleted() {
      try {
        this.setIsLoading(true);
        const data = await todoApi.clearCompleted();

        if (!data) {
          throw "Couldn't clear tasks";
        }

        this.fetchTaskArray();
        return data;
      } catch (err) {
        this.setErrorMessage("trying to clear completed tasks");
      } finally {
        this.setIsLoading(false);
      }
    },
    async addTask(newTask: TaskContent) {
      try {
        this.setIsLoading(true);
        const data = await todoApi.addTask(newTask);

        if (!data) {
          throw "Couldn't add task";
        }

        this.fetchTaskArray();
        return data;
      } catch (err) {
        this.setErrorMessage("adding the task");
      } finally {
        this.setIsLoading(false);
      }
    },
    async changeTask(changes: TaskContent) {
      try {
        this.setIsLoading(true);
        const data = await todoApi.updateTask(changes);

        if (!data) {
          throw "Couldn't change task";
        }

        this.fetchTaskArray();
        return data;
      } catch (err) {
        this.setErrorMessage("changing tasks state");
      } finally {
        this.setIsLoading(false);
      }
    },
    async deleteTask(taskId: string) {
      try {
        this.setIsLoading(true);
        const data = await todoApi.deleteTask(taskId);

        if (!data) {
          throw "Couldn't delete task";
        }

        this.fetchTaskArray();
        return data;
      } catch (err) {
        this.setErrorMessage("deleting task");
      } finally {
        this.setIsLoading(false);
      }
    },
  },
});
