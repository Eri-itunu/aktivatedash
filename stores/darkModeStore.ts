// stores/darkModeStore.ts
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import persistedState from 'pinia-plugin-persistedstate'

export const useDarkModeStore = defineStore('darkMode', () => {
  // State
  const isDarkMode = ref(true)

  // Actions
  function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value
    updateDocumentClass()
  }

  function setDarkMode(darkMode: boolean) {
    isDarkMode.value = darkMode
    updateDocumentClass()
  }

  // Helper to update the `dark` class on the `html` element
  function updateDocumentClass() {
    document.documentElement.classList.toggle('dark', isDarkMode.value)
  }

  // Computed
  const darkMode = computed(() => isDarkMode.value)

  return { isDarkMode, darkMode, toggleDarkMode, setDarkMode }
}, {
  persist: true, // Enable persistence for this store
})
