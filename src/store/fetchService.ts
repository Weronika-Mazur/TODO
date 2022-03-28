export default class FetchService {
  getToken() {
    return `Bearer ${localStorage.getItem("jwt")}`;
  }

  get(endpoint: string) {
    return this.client("GET", endpoint);
  }

  post(endpoint: string, body: object) {
    return this.client("POST", endpoint, body);
  }

  put(endpoint: string, body: object) {
    return this.client("PUT", endpoint, body);
  }

  delete(endpoint: string, body?: object) {
    return this.client("DELETE", endpoint, body);
  }

  async client(method: string, endpoint: string, body?: object) {
    try {
      const data = await fetch(endpoint, {
        method: method,
        body: JSON.stringify(body),
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
