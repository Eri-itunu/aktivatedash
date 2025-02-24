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
useHead({
  htmlAttrs: {
    class: darkModeStore.isDarkMode ? 'dark' : '',
  },
})
</script>

<style>
.heading-text {
  display: none;
}

#heading-text {
  display: none;
}
</style>
