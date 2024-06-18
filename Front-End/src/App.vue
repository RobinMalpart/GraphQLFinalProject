<script setup lang="ts">
import { ref } from 'vue';
import Header from './components/Header.vue';
import Home from './components/pages/Home.vue';
import LoginRegister from './components/pages/LoginRegister.vue';
import { RouterView } from 'vue-router';

// État local pour l'authentification de l'utilisateur
const isAuthenticated = ref(false);

// Méthodes pour se connecter et se déconnecter
const login = () => {
  isAuthenticated.value = true;
};

const logout = () => {
  isAuthenticated.value = false;
};
</script>

<template>
  <Header />
  <div>
    <router-view v-if="isAuthenticated" />
    <LoginRegister v-else :onLogin="login" />
  </div>
</template>

<style scoped>
</style>
