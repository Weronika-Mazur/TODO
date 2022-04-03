import { fetchService } from "../api/fetchService";
import { TaskContent, Task } from "../types/type";

class TodoAPI {
  getTodoList() {
    return fetchService.get<undefined, Task[]>("todos/");
  }

  deleteTask(id: string) {
    const endpoint = `todos/delete-task/${id}`;
    return fetchService.delete<undefined, Task[]>(endpoint);
  }

  clearCompleted() {
    return fetchService.delete<undefined, Task[]>("todos/clear-tasks");
  }

  addTask(newTask: TaskContent) {
    return fetchService.post<TaskContent, Task[]>("todos/add-task", newTask);
  }

  updateTask(changes: TaskContent) {
    const endpoint = `todos/change-task/${changes._id}`;
    return fetchService.put<TaskContent, Task[]>(endpoint, changes);
  }
}

export const todoApi = new TodoAPI();
