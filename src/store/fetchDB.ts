import { typeTaskContent } from "../types/type";

export default class FetchDB {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  async get() {
    const data = await fetch(this.url);
    const response = await data.json();

    return response;
  }

  async delete(id?: string) {
    const url = id
      ? `${this.url}/delete-task/${id}`
      : `${this.url}/clear-tasks`;

    const data = await fetch(url, { method: "DELETE" });
    const response = await data.json();

    return response;
  }

  async post(newTask: typeTaskContent) {
    const url = `${this.url}/add-task`;

    const data = await fetch(url, {
      method: "POST",
      body: JSON.stringify(newTask),
      headers: {
        "content-type": "application/json",
      },
    });
    const response = await data.json();

    return response;
  }

  async put(changes: typeTaskContent) {
    const url = `${this.url}/change-task/${changes._id}`;

    const data = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(changes),
      headers: {
        "content-type": "application/json",
      },
    });
    const response = await data.json();

    return response;
  }
}
