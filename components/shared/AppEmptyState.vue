<script setup lang="ts">
import { Button } from '@/components/ui/button';


interface Props {
  title: string;
  description?: string;
  icon?: any; // Component type
  actionLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  
});

defineEmits(['action']);
</script>

<template>
  <div class="flex flex-col items-center justify-center py-12 px-6 text-center bg-gray-50 dark:bg-vDarkBlue/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
    <div class="mb-4 p-3 bg-white dark:bg-gray-800 rounded-full shadow-sm">
      <!-- <component :is="icon" class="w-8 h-8 text-gray-400 dark:text-gray-500" /> -->
    </div>
    
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
      {{ title }}
    </h3>
    
    <p v-if="description" class="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-6">
      {{ description }}
    </p>

    <Button
      v-if="actionLabel"
      class="bg-purple1 hover:bg-purple1/90 text-white rounded-full px-6"
      @click="$emit('action')"
    >
      {{ actionLabel }}
    </Button>
  </div>
</template>

