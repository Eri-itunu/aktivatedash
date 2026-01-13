<script setup lang="ts">
interface Props {
  title: string;
  description?: string;
  icon?: string;
  iconClass?: string;
  actionLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  icon: '/icons/empty-filter.png',
  iconClass: 'w-20 h-20 opacity-50',
});

defineEmits(['action']);
</script>

<template>
  <div class="flex flex-col items-center justify-center py-12 px-6 text-center bg-vDarkBlue/50 rounded-xl border border-dashed border-darkBlue">
    <div v-if="icon" class="mb-4">
      <img :src="icon" :class="iconClass" alt="Empty state icon" />
    </div>
    
    <h3 class="text-xl font-semibold text-white mb-2">
      {{ title }}
    </h3>
    
    <p v-if="description" class="text-grey1 max-w-sm mb-6">
      {{ description }}
    </p>

    <UButton
      v-if="actionLabel"
      color="purple"
      variant="solid"
      size="md"
      class="rounded-full px-8"
      @click="$emit('action')"
    >
      {{ actionLabel }}
    </UButton>
  </div>
</template>

<style scoped>
/* Add any specific styles if needed */
</style>
