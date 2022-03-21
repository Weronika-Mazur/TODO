<template>
  <section class="login">
    <div class="login__header">
      <UserIcon class="login__user-icon" />
    </div>

    <h1 class="login__title">Sign In</h1>

    <Form class="login__form" :validation-schema="schema" @submit="onSubmit">
      <label
        for="email"
        class="login__label animate__animated animate__fadeInUp"
        >Email:</label
      >
      <Field
        name="email"
        type="email"
        id="email"
        class="login__input animate__animated animate__fadeInUp"
        placeholder="Email..."
        required
      />
      <ErrorMessage name="email" class="login__error" />

      <label
        for="password"
        class="login__label animate__animated animate__fadeInUp"
        >Password:</label
      >

      <Field
        name="password"
        type="password"
        id="password"
        class="login__input animate__animated animate__fadeInUp"
        placeholder="Password..."
        required
      />
      <ErrorMessage name="password" class="login__error" />

      <button class="login__login-button animate__animated animate__fadeInUp">
        Login
      </button>
    </Form>
    <p class="login__sign-up">
      Don't have an account?
      <router-link :to="{ name: 'Register' }" class="login__link"
        >Sign up</router-link
      >
    </p>
  </section>
</template>

<script setup lang="ts">
import UserIcon from "../assets/UserIcon.vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import { object, string } from "yup";
import userHandling from "../helpers/userHandling";
import { useRouter } from "vue-router";
import { useStore } from "../store/store";

const router = useRouter();
const store = useStore();

const schema = object().shape({
  email: string().required("Email is required").email("Invalid email"),
  password: string().required("Password is required"),
});
const url = "http://localhost:3030/User/Login";

async function onSubmit(values: { email?: string; password?: string }) {
  try {
    const response = await userHandling(values, url);

    if (!response) {
      throw "Cannot connect to server";
    }

    if (response.error) {
      throw response.error;
    }

    const { token } = response;

    if (token) {
      localStorage.setItem("jwt", token);
      store.setUsername(values.email);
      router.push({ name: "Home" });
    }
  } catch (e: any) {
    const error = e.message || e;
    const errorMessage = `loging in. ${error}`;
    store.setErrorMessage(errorMessage);
  }
}
</script>

<style lang="scss">
.login {
  background-color: var(--very-dark-desaturated-blue);
  padding: 8px 20px;

  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
    rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
    rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
  width: 640px;
  margin-top: 80px;
  margin-bottom: 74px;
  padding: 0;

  &__form {
    color: var(--light-grayish-blue-dark-mode);
    display: flex;
    gap: 2px;
    flex-direction: column;
    margin: 36px 44px;
    margin-top: 12px;
  }

  &__input {
    background-color: transparent;
    border: none;
    border-bottom: solid 1px var(--very-dark-grayish-blue-dark-mode-second);
    color: var(--light-grayish-blue-dark-mode);
    font-weight: 400;
    font-size: 18px;
    font-family: "Josefin Sans", sans-serif;
    padding: 20px;
    padding-left: 8px;
    padding-bottom: 14px;

    &::placeholder {
      color: var(--dark-grayish-blue-dark-mode);
    }

    &:focus {
      outline: none;
    }
  }

  &__login-button {
    background-color: var(--bright-blue);
    border: none;
    color: white;
    padding: 16px;
    margin-top: 22px;
    font-family: "Josefin Sans", sans-serif;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
  }

  &__label {
    padding: 12px 0px;
  }

  &__sign-up {
    margin: 28px 44px;
    text-align: center;
    color: var(--light-grayish-blue-dark-mode);
  }

  &__link {
    color: var(--bright-blue);
    font-weight: 700;
  }

  &__user-icon {
    width: 64px;
    height: 64px;
    fill: var(--bright-blue);
  }

  &__header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0 44px;
    margin-top: 26px;

    &:before,
    &:after {
      content: "";
      flex: 1 1;
      border-bottom: 1px solid var(--dark-grayish-blue-dark-mode);
      margin: auto;
    }
    &::before {
      margin-right: 10px;
    }
    &::after {
      margin-left: 10px;
    }
  }

  &__title {
    text-align: center;
    font-size: 36px;
    font-weight: 700;
    margin: 18px;
    margin-bottom: 6px;
    color: var(--light-grayish-blue-dark-mode);
  }

  &__error {
    margin-top: 8px;
    font-weight: 400;
    color: #ff6495;
    font-size: 14px;
  }
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  -webkit-text-fill-color: var(--light-grayish-blue-dark-mode);
  box-shadow: 0 0 0px 1000px var(--very-dark-desaturated-blue) inset;
  -webkit-box-shadow: 0 0 0px 1000px var(--very-dark-desaturated-blue) inset;
  transition: background-color 5000s ease-in-out 0s;
}
</style>
