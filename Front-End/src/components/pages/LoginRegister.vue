<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-md mb-3">
      <h2 class="text-2xl font-bold mb-4">Login / Register</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" id="password" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">Log In</button>
      </form>
    </div>

    <!-- Sign Up Section -->
    <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-md mt-3">
      <h2 class="text-2xl font-bold mb-4">Sign Up</h2>
      <form>
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" id="name" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div class="mb-4">
          <label for="email-signup" class="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email-signup" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div class="mb-4">
          <label for="password-signup" class="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" id="password-signup" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <button type="submit" class="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">Sign Up</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ onLogin: () => void }>();

const handleLogin = () => {
  props.onLogin();
};
</script>

<style scoped>
</style>