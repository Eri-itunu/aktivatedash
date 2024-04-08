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

const selected = ref(true)
</script>

<template>
  <div class="flex justify-between my-5">
    <div class="flex flex-wrap gap-5" >
        <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
            <UButton color="white" label="Content Type" trailing-icon="i-heroicons-chevron-down-20-solid" />
        </UDropdown>

        <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
            <UButton color="white" label="Platform Type" trailing-icon="i-heroicons-chevron-down-20-solid" />
        </UDropdown>

        <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
            <UButton color="white" label="Price Per Post" trailing-icon="i-heroicons-chevron-down-20-solid" />
        </UDropdown>

        <HeadlessMenu as="div" class="relative inline-block text-left">
          <div>
            <HeadlessMenuButton
              class="inline-flex w-full justify-center rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-purplebg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
            >
              Options
              
            </HeadlessMenuButton>
          </div>

          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <HeadlessMenuItems
              class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-black shadow-lg ring-1 ring-black/5 focus:outline-none"
            >
              <div class="px-1 py-1">
                <HeadlessMenuItem v-slot="{ active }">
                  <UCheckbox v-model="selected" name="notifications" label="Notifications" />
                </HeadlessMenuItem>
                <HeadlessMenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? 'bg-violet-500 text-white' : 'text-gray-900',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]"
                  >
                    
                    Duplicate
                  </button>
                </HeadlessMenuItem>
              </div>
              <div class="px-1 py-1">
                <HeadlessMenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? 'bg-violet-500 text-white' : 'text-gray-900',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]"
                  >
                    
                    Archive
                  </button>
                </HeadlessMenuItem>
                <HeadlessMenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? 'bg-violet-500 text-white' : 'text-gray-900',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]"
                  >
                    
                    Move
                  </button>
                </HeadlessMenuItem>
              </div>

              <div class="px-1 py-1">
                <HeadlessMenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? 'bg-violet-500 text-white' : 'text-gray-900',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]"
                  >
                   
                    Delete
                  </button>
                </HeadlessMenuItem>
              </div>
            </HeadlessMenuItems>
          </transition>
        </HeadlessMenu>
    </div>

    <div>
        <UButton color="purple" size="xl" variant="solid"><p class="text-white">Reset</p></UButton>
    </div>


  </div>
</template>

