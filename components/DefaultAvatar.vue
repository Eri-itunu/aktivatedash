<script setup lang="ts">
const userStore = useUserStore();
const props = defineProps<{
  firstName: string | undefined;
  lastName: string | undefined;
}>();
</script>

<template>
  <div
    class="border-2 rounded-full justify-center flex items-center bg-purplelabel h-full w-full"
  >
    <p class="text-sm text-black font-bold text-nowrap">
      {{ firstName?.charAt(0) }}
      {{ lastName?.charAt(0) }}
    </p>
  </div>
</template>
