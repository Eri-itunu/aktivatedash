<template>
    <div class="flex justify-between items-center px-8 py-2 overflow-hidden">
        <div>
            <p class="text-[#6D6B76] text-sm" v-if="isDashboard">Dashboard</p>
            <p class="text-[#6D6B76] text-sm" v-if="isCollaborationHub">Collaboration Hub</p>
            <p class="text-[#6D6B76] text-sm" v-if="isCampaign">Campaign</p>
            <p class="text-[#6D6B76] text-sm" v-if="isRevenue">Revenue</p>
            <p class="text-[#6D6B76] text-sm" v-if="isPlatform">Platform</p>
        </div>

        <UInput
            icon="i-heroicons-magnifying-glass-20-solid"
            size="lg"
            color="white"
            :trailing="false"
            placeholder="Search..."

        />

        <div class="flex items-center gap-2" >

            <HeadlessMenu>
                <HeadlessMenuButton
                class="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                >
                    <img src="/assets/icons/notification.svg" alt="">
            
                </HeadlessMenuButton>
                <transition
                    enter-active-class="transition duration-100 ease-out"
                    enter-from-class="transform scale-95 opacity-0"
                    enter-to-class="transform scale-100 opacity-100"
                    leave-active-class="transition duration-75 ease-in"
                    leave-from-class="transform scale-100 opacity-100"
                    leave-to-class="transform scale-95 opacity-0"
                >
                    <HeadlessMenuItems
                        class="absolute right-24 top-16 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md border-1 border-[#464160] bg-[#090618] shadow-lg ring-1 ring-black/5 focus:outline-none"
                    >
                        <div class="px-1 py-1">
                            <HeadlessMenuItem v-slot="{ active }">
                            <button
                                :class="[
                                active ? 'bg-violet-500 text-white' : 'text-white-900',
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
                                active ? 'bg-violet-500 text-white' : 'text-white-900',
                                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                ]"
                            >
                                
                                Archive
                            </button>
                            </HeadlessMenuItem>
                            <HeadlessMenuItem v-slot="{ active }">
                            <button
                                :class="[
                                active ? 'bg-violet-500 text-white' : 'text-white-900',
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
                                active ? 'bg-violet-500 text-white' : 'text-white-900',
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
            
            
            <nuxt-link class="cursor-pointer" to="/dashboard/profile"> 
                <img src="/assets/images/Avatar.svg" alt="">
            </nuxt-link>
        </div>
    </div>
</template>

<script >




  export default {
  computed: {
    isDashboard() {
      // Check if the current route is the Home page
      return this.$route.path === '/dashboard';
    },
    isCollaborationHub(){
        return this.$route.path === '/dashboard/collaboration-hub';
    },
    isCampaign(){
        return this.$route.path === '/dashboard/campaigns';
    },
    isRevenue(){
        return this.$route.path === '/dashboard/revenue';
    },
    isPlatform(){
        return this.$route.path === '/dashboard/platform';
    },
  }
};
</script>

=