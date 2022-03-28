import FetchService from "./fetchService";
import { typeTaskContent } from "../types/type";

export default class TodoAPI {
  url: string;
  fetchClient: FetchService;

  constructor(url: string) {
    this.url = url;
    this.fetchClient = new FetchService();
  }

  getTodoList() {
    return this.fetchClient.get(this.url);
  }

  deleteTask(id: string) {
    const url = `${this.url}/delete-task/${id}`;
    return this.fetchClient.delete(url);
  }

  clearCompleted() {
    const url = `${this.url}/clear-tasks`;
    return this.fetchClient.delete(url);
  }

  addTask(newTask: typeTaskContent) {
    const url = `${this.url}/add-task`;
    return this.fetchClient.post(url, newTask);
  }

  updateTask(changes: typeTaskContent) {
    const url = `${this.url}/change-task/${changes._id}`;
    return this.fetchClient.put(url, changes);
  }
}
