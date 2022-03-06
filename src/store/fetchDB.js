export default class FetchDB {
  constructor(url) {
    this.url = url;
  }

  async get() {
    const data = await fetch(this.url);
    const response = await data.json();

    return response;
  }

  async delete(id) {
    const url = id
      ? `${this.url}/delete-task/${id}`
      : `${this.url}/clear-tasks`;

    const data = await fetch(url, { method: "DELETE" });
    const response = await data.json();

    return response;
  }

  async post(newTask) {
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

  async put(changes) {
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
