import { createApp } from "vue";
import { router } from "./router";

import Particles from "particles.vue3";
import VueGtag from "vue-gtag";

import App from "./App.vue";
import "./index.css";

const app = createApp(App);

app.use(router);
app.use(Particles);
app.use(VueGtag, {
  property: {
    id: "G-FGQMXDNNV0",
  },
});

app.mount("#app");
