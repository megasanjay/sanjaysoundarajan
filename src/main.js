import { createApp } from "vue";
import { router } from "./router";
import App from "./App.vue";
import "./index.css";

import Particles from "particles.vue3";

const app = createApp(App);

app.use(router);
app.use(Particles);

app.mount("#app");
