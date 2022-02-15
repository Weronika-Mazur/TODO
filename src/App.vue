<template>
  <div class="background-img"></div>
  <div class="container">
    <Header />
    <TaskContainer />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import TaskContainer from "./components/TaskContainer.vue";

export default {
  name: "App",
  components: {
    Header,
    TaskContainer,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;700&family=Poppins:wght@500;700&display=swap");

:root {
  --bright-blue: #3a7bfd;
  --check-background: linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%));

  --very-light-grey: hsl(0, 0%, 98%);
  --very-light-grayish-blue: hsl(236, 33%, 92%);
  --light-grayish-blue: hsl(233, 11%, 84%);
  --dark-grayish-blue: hsl(236, 9%, 61%);
  --very-dark-grayish-blue: hsl(235, 19%, 35%);

  --very-dark-blue: hsl(235, 21%, 11%);
  --very-dark-desaturated-blue: hsl(235, 24%, 19%);
  --light-grayish-blue-dark-mode: hsl(234, 39%, 85%);
  --light-grayish-blue-hover: hsl(236, 33%, 92%);
  --dark-grayish-blue-dark-mode: hsl(234, 11%, 52%);
  --very-dark-grayish-blue-dark-mode: hsl(233, 14%, 35%);
  --very-dark-grayish-blue-dark-mode-second: hsl(237, 14%, 26%);
}

body {
  background-color: var(--very-dark-blue);
  position: relative;
  color: white;
  margin: 0;
}

.background-img {
  background-image: url("./assets/bg-desktop-dark.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 300px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  margin: 0;
  padding: 0;
}

#app {
  font-family: "Josefin Sans", sans-serif;

  display: flex;
  align-items: center;
  justify-content: center;
}

header {
  display: flex;
  align-items: space-between;
  justify-content: space-between;
}

header h1 {
  font-size: 42px;
  letter-spacing: 12px;
}

button {
  background: none;
  border: none;
  cursor: pointer;
}

.container {
  width: 540px;
  margin-top: 80px;
}

/* // .header {
//   // some styles
//   &__title {
//     color: red;
//   }

//   &__btn {
//     width: 300px;

//     &--disabled {
//       color: grey;
//     }
//   }
// } */
</style>
