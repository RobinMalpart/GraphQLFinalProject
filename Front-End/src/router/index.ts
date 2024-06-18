// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/pages/Home.vue';

const routes = [
  { path: '/', component: Home },
  // { path: '/account', component: Account },
  // { path: '/profile', component: Profile },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
