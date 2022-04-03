import { defineStore } from "pinia";
import router from "../router";

import { userApi } from "../api/userAPI";
import { FormValues } from "../types/type";

import { useTodoStore } from "../store/todoStore";

interface State {
  username: string;
}

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      username: "",
    } as State;
  },
  actions: {
    setUsername(username?: string) {
      this.username = username || "";
    },
    async login(values: FormValues) {
      const todoStore = useTodoStore();

      try {
        const response = await userApi.login(values);

        if (!response) {
          throw "Cannot connect to server";
        }

        if (response.error) {
          throw response.error;
        }

        const { token } = response;

        if (token) {
          localStorage.setItem("jwt", token);
          this.setUsername(values.email);
          router.push({ name: "Home" });
        }
      } catch (e: any) {
        const error = e.message || e;
        const errorMessage = `loging in. ${error}`;
        todoStore.setErrorMessage(errorMessage);
      }
    },

    async register(values: FormValues) {
      const todoStore = useTodoStore();

      try {
        const response = await userApi.register(values);

        if (!response) {
          throw "Cannot connect to server";
        }

        if (response.error) {
          throw response.error;
        }

        const { token } = response;

        if (token) {
          localStorage.setItem("jwt", token);
          this.setUsername(values.email);
          router.push({ name: "Home" });
        }
      } catch (e: any) {
        const error = e.message || e;
        const errorMessage = `signing up. ${error}`;
        todoStore.setErrorMessage(errorMessage);
      }
    },
  },
});
