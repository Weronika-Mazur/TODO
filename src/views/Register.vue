<template>
  <section class="sign-up">
    <div class="sign-up__header">
      <UserIcon class="sign-up__user-icon" />
    </div>

    <h1 class="sign-up__title">Sign Up</h1>

    <Form class="sign-up__form" :validation-schema="schema" @submit="register">
      <label
        for="email"
        class="sign-up__label animate__animated animate__fadeInUp"
        >Email:</label
      >
      <Field
        name="email"
        type="email"
        id="email"
        class="sign-up__input animate__animated animate__fadeInUp"
        placeholder="Email..."
        required
      >
      </Field>
      <ErrorMessage name="email" class="sign-up__error" />

      <label
        for="signupPassword"
        class="sign-up__label animate__animated animate__fadeInUp"
        >Password:</label
      >
      <Field
        name="password"
        type="password"
        id="signupPassword"
        class="sign-up__input animate__animated animate__fadeInUp"
        placeholder="Password..."
        required
      >
      </Field>
      <ErrorMessage name="password" class="sign-up__error" />

      <label
        for="repeatPassword"
        class="sign-up__label animate__animated animate__fadeInUp"
        >Repeat password:</label
      >
      <Field
        name="repeatPassword"
        type="password"
        id="repeatPassword"
        class="sign-up__input animate__animated animate__fadeInUp"
        placeholder="Repeat password..."
      >
      </Field>
      <ErrorMessage name="repeatPassword" class="sign-up__error" />

      <button
        class="sign-up__sign-up-button animate__animated animate__fadeInUp"
      >
        Create an account
      </button>
    </Form>
    <p class="sign-up__login">
      Already have an account?
      <router-link :to="{ name: 'Login' }" class="sign-up__link"
        >Log in</router-link
      >
    </p>
  </section>
</template>

<script setup lang="ts">
import * as yup from "yup";
import { Field, Form, ErrorMessage } from "vee-validate";

import UserIcon from "../assets/UserIcon.vue";

import { FormValues } from "../types/type";
import { useUserStore } from "../store/userStore";

const userStore = useUserStore();

const schema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Password must be minimum 5 characters long"),
  repeatPassword: yup
    .string()
    .required("Repeat the password")
    .oneOf([yup.ref("password"), null], "Passwords don't match"),
});

const register = (data: FormValues) => userStore.register(data);
</script>

<style lang="scss">
.sign-up {
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

  &__sign-up-button {
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

  &__login {
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
