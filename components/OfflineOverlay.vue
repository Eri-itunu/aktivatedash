<template>
    <div v-if="!isOnline" class="fixed inset-0 bg-gray-900 text-white flex items-center justify-center z-50">
      <div class="text-center">
        <h1 class="text-4xl font-bold">You are offline</h1>
        <p class="text-lg mt-4">Please check your internet connection and try again.</p>
        {{ isOnline }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from "vue";
  
  const isOnline = ref(true);
  
  const updateOnlineStatus = () => {
    isOnline.value = navigator.onLine;
  };
  
  onMounted(() => {
    updateOnlineStatus();
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
  });
  
  onBeforeUnmount(() => {
    window.removeEventListener("online", updateOnlineStatus);
    window.removeEventListener("offline", updateOnlineStatus);
  });
  </script>
  
  <style scoped>
  .fixed {
    background-color: rgba(0, 0, 0, 0.85);
  }
  </style>
  