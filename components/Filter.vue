<script setup lang="ts">
const items = [
  [{
    label: 'Profile',
    avatar: {
      src: 'https://avatars.githubusercontent.com/u/739984?v=4'
    }
  }], [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    shortcuts: ['E'],
    click: () => {
      console.log('Edit')
    }
  }, {
    label: 'Duplicate',
    icon: 'i-heroicons-document-duplicate-20-solid',
    shortcuts: ['D'],
    disabled: true
  }], [{
    label: 'Archive',
    icon: 'i-heroicons-archive-box-20-solid'
  }, {
    label: 'Move',
    icon: 'i-heroicons-arrow-right-circle-20-solid'
  }], [{
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
    shortcuts: ['⌘', 'D']
  }]
]
</script>

<template>
  <div class="flex justify-between my-5">
    <div class="flex gap-5" >
        <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
            <UButton color="white" label="Content Type" trailing-icon="i-heroicons-chevron-down-20-solid" />
        </UDropdown>

        <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
            <UButton color="white" label="Platform Type" trailing-icon="i-heroicons-chevron-down-20-solid" />
        </UDropdown>

        <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
            <UButton color="white" label="Price Per Post" trailing-icon="i-heroicons-chevron-down-20-solid" />
        </UDropdown>
    </div>

    <div>
        <UButton color="purple" size="xl" variant="solid"><p class="text-white">Reset</p></UButton>
    </div>


  </div>
</template>

