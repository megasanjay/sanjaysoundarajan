import { createRouter, createWebHistory } from "vue-router";

// Component imports
import HomePage from "../views/HomePage.vue";
import ProjectsPage from "../views/ProjectsPage.vue";

const routes = [
  { path: "/", component: HomePage, name: "Story" },
  { path: "/projects", component: ProjectsPage, name: "Projects" },
  { path: "/about", component: ProjectsPage, name: "About" },
  { path: "/contact", component: ProjectsPage, name: "Contact" },
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
