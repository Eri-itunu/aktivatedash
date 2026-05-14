<script setup lang="ts">
interface Props {
  label: string;
  value: string | number;
  subValue?: string;
}

defineProps<Props>();
</script>

<template>
  <div class="p-6 bg-white dark:bg-vDarkBlue rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-start justify-between">
    <div>
      <p class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{{ label }}</p>
      <h3 class="text-2xl font-bold text-gray-900 dark:text-white">{{ value }}</h3>
      <p v-if="subValue" class="text-xs text-gray-400 mt-1">{{ subValue }}</p>
    </div>
    <div v-if="$slots.icon" class="p-2 bg-purple1/10 rounded-lg">
      <slot name="icon" />
    </div>
  </div>
</template>