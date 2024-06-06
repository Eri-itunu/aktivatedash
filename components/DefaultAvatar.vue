<script setup lang="ts">
const userStore = useUserStore();
const props = defineProps({
  firstName: String,
  lastName: String,
});
</script>

<template>
  <div
    class="border-4 rounded-full justify-center flex items-center bg-purplelabel h-full w-full"
  >
    <p class="text-sm text-black font-bold text-nowrap">
      {{ firstName?.charAt(0) }}
      {{ lastName?.charAt(0) }}
    </p>
  </div>
</template>
