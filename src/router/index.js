import { createRouter, createWebHistory } from "vue-router";

// Component imports
import HomePage from "../views/home/HomePage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/projects", component: HomePage },
];

export const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: function (to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    } else {
      window.scrollTo(0, 0);
    }
  },
  routes,
});
