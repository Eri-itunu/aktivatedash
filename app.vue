<template>
  <div :class="{ 'dark': darkModeStore.isDarkMode }">
    <OfflineOverlay />
    <UNotifications />
    <Toaster />
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts" >
const darkModeStore = useDarkModeStore()
</script>

<style>
.heading-text {
  display: none;
}

#heading-text {
  display: none;
}
</style>
