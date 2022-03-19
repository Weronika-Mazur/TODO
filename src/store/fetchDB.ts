import { typeTaskContent } from "../types/type";

export default class FetchDB {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  getToken() {
    return `Bearer ${localStorage.getItem("jwt")}`;
  }

  async get() {
    try {
      const data = await fetch(this.url, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: this.getToken(),
        },
      });
      if (data) {
        const response = await data.json();
        return response;
      }
    } catch (err) {}
  }

  async delete(id?: string) {
    try {
      const url = id
        ? `${this.url}/delete-task/${id}`
        : `${this.url}/clear-tasks`;

      const data = await fetch(url, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: this.getToken(),
        },
      });
      if (data) {
        const response = await data.json();
        return response;
      }
    } catch (err) {}
  }

  async post(newTask: typeTaskContent) {
    try {
      const url = `${this.url}/add-task`;

      const data = await fetch(url, {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: {
          "content-type": "application/json",
          Authorization: this.getToken(),
        },
      });
      if (data) {
        const response = await data.json();
        return response;
      }
    } catch (err) {}
  }

  async put(changes: typeTaskContent) {
    try {
      const url = `${this.url}/change-task/${changes._id}`;

      const data = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(changes),
        headers: {
          "content-type": "application/json",
          Authorization: this.getToken(),
        },
      });

      if (data) {
        const response = await data.json();
        return response;
      }
    } catch (err) {}
  }
}
