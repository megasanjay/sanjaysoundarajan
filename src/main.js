import { createApp } from "vue";
import Particles from "particles.vue3";
import { router } from "./router";
import App from "./App.vue";
import "./index.css";

const app = createApp(App);

app.use(router);
app.use(Particles);

app.mount("#app");
