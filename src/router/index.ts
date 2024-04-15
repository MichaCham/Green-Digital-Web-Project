import { createRouter, createWebHistory } from "vue-router";
import LotDetails from "../components/LotDetails.vue";
import HomePage from "../views/HomePage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/lot/:projectName/:lotName",
      name: "lot",
      component: LotDetails,
      props: true,
    },
  ],
});

export default router;
