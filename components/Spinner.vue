<script setup lang="ts">
defineProps({
  loading: Boolean,
});
</script>

<template>
  <div
    v-if="loading"
    class="p-3 border-2 border-grey2 border-t-black rounded-full w-min h-min text-center animate-spin"
  ></div>
  <!-- spinner -->
</template>
