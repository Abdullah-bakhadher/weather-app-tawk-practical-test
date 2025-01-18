import { createRouter, createWebHistory } from "vue-router";

// Define your routes
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../pages/Home.vue"), // Lazy loading Home component
  },
  {
    path: "/user-profile",
    name: "UserProfile",
    component: () => import("../pages/UserProfile.vue"), // Lazy loading UserProfile component
  },
  {
    path: "/:id",
    name: "CityWeatherDetailPage",
    component: () => import("../pages/CityWeatherDetailPage.vue"), // Lazy loading cityDetailPage component
  },
];

// Create router instance
const router = createRouter({
  history: createWebHistory(), // Use HTML5 history mode
  routes,
});

export default router;
