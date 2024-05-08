<script setup lang="ts" >

    import UserRoles from "../../enums/userRoles"
    
    const route = useRoute()
    const userStore = useUserStore()
    const isDashboard = computed<boolean>(()=> route.path === 'creator/dashboard')
    const isCollaborationHub = computed<boolean>(()=> route.path === 'creator/dashboard/collaboration-hub')
    const isCampaign = computed<boolean>(()=> route.path.includes('campaign'))
    const isRevenue = computed<boolean>(()=> route.path.includes('revenue'))
    const isPlatform = computed<boolean>(()=> route.path.includes('platform'))
    
    

    const props = defineProps({
        toggleSidebar: Function
    })
    
  
</script>
<template>
    <div class="flex justify-between items-center px-8 pb-2">
        
        <div class="flex gap-4">
            <!-- <img @click="toggleSidebar" src="~/assets/icons/aktivate-logo-small.svg" alt=""> -->
            <p class="text-[#6D6B76] text-sm" v-if="isDashboard">Dashboard</p>
            <p class="text-[#6D6B76] text-sm" v-if="isCollaborationHub">Collaboration Hub</p>
            <p class="text-[#6D6B76] text-sm" v-if="isCampaign">Campaign</p>
            <p class="text-[#6D6B76] text-sm" v-if="isRevenue">Revenue</p>
            <p class="text-[#6D6B76] text-sm" v-if="isPlatform">Platform</p>
        </div>
 
        

        <div class="flex items-center gap-2" >

            <img src="../assets/icons/notification.svg" alt="">


            <div >
                <button @click="navigateTo('/creator/dashboard/profile')"  class=" cursor-pointer flex justify-around h-9 w-9 rounded-full border-2 border-white overflow-hidden bg-grey1">
                    <img class="object-contain" src="https://robohash.org/random?set=set2" alt="">
                </button>
            </div>
        </div>
    </div>
</template>


=