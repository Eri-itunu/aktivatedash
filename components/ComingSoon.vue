<script setup lang="ts">
    const props = defineProps<{ isOpen: boolean}>()
</script>

<template>
    
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between text-purplelabel">
            Coming Soon!
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"

            />
          </div>
        </template>

        
      </UCard>

</template>