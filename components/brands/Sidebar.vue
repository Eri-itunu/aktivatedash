<template>
    <div class="bg-[#090618] h-[98vh] flex flex-col justify-between md:left-0 rounded-[20px] " >

        <div class="basis-1/4 pl-4 md:pt-6 z-10">
            <img src="/assets/icons/AktivateLogo.svg" class="" alt="">
        </div>

        <div class="basis-2/4 pl-4 pr-2 flex flex-col gap-4 md:gap-5 items-center md:items-start z-10 ">
            
            <nuxt-link  to='/brands/dashboard' class="w-full">
                <div class="flex items-center gap-4 cursor-pointer  hover:bg-purplebg hover:bg-opacity-[10%] w-full px-4  py-2 rounded-[100px] hover:text-purplebg  hover:font-semibold "
                :class="{'bg-purplebg bg-opacity-[10%] text-purplebg font-semibold ': isDashboard}">
                    <img src="/assets/icons/category.svg" class="w-8 md:w-auto" alt="">
                    <p class="  text-[#98A2B3]  text-nowrap text-lg lg:text-xl"> Dashboard</p>
                </div>
            </nuxt-link>

            <nuxt-link to='/brands/dashboard/campaigns' class="w-full">
                <div class="flex items-center gap-4 cursor-pointer  hover:bg-purplebg hover:bg-opacity-[10%] w-full px-4  py-2 rounded-[100px] hover:text-purplebg  hover:font-semibold "
                :class="{'bg-purplebg bg-opacity-[10%] text-purplebg font-semibold ': isCampaign}">
                    <img src="../../assets/icons/Group.svg" class="w-8 md:w-auto" alt="">
                    <p class=" text-[#98A2B3]  text-nowrap text-lg lg:text-xl"> Campaigns</p>
               </div>
            </nuxt-link>

            <nuxt-link to='/brands/dashboard/report' class="w-full">
                <div class="flex items-center justify-cetner cursor-pointer gap-4  hover:bg-purplebg hover:bg-opacity-[10%] w-full px-4  py-2 rounded-[100px] hover:text-purplebg  hover:font-semibold "
                :class="{'bg-purplebg bg-opacity-[10%] text-purplebg font-semibold ': isReport}">
                    <ClipboardPenLine class="w-6 h-6"/>
                    <p class=" text-[#98A2B3]  text-nowrap text-lg lg:text-xl"> Reporting</p>
               </div>
            </nuxt-link>

            <nuxt-link to='/brands/dashboard/content' class="w-full">
                <div class="flex items-center gap-4 cursor-pointer  hover:bg-purplebg hover:bg-opacity-[10%] w-full px-4  py-2 rounded-[100px] hover:text-purplebg  hover:font-semibold "
                :class="{'bg-purplebg bg-opacity-[10%] text-purplebg font-semibold ': isContent}">
                    <img src="../../assets/icons/Group.svg" class="w-8 md:w-auto" alt="">
                    <p class=" text-[#98A2B3]  text-nowrap text-lg lg:text-xl"> Content</p>
                </div>
            </nuxt-link>
                <Dialog class="w-full">
                  <DialogTrigger class="w-full">
                    <div class="flex items-center gap-4 cursor-pointer  hover:bg-purplebg hover:bg-opacity-[10%] w-full px-4  py-2 rounded-[100px] hover:text-purplebg  hover:font-semibold  "
                    :class="{'bg-purplebg bg-opacity-[10%] text-purplebg font-semibold ': isRevenue}">
                        <img src="../../assets/icons/people.svg" class="w-8 md:w-auto" alt="">
                        <p class=" text-[#98A2B3]  text-nowrap text-lg lg:text-xl"> Influencers</p>
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    Coming Soon!
                  </DialogContent>
                </Dialog>
                
               
     
<!-- 
            <nuxt-link to='' class="w-full">
                <div @click="isOpen = true" class="flex items-center gap-4 cursor-pointer  hover:bg-purplebg hover:bg-opacity-[10%] w-full px-4  py-2 rounded-[100px] hover:text-purplebg  hover:font-semibold "
                :class="{'bg-purplebg bg-opacity-[10%] text-purplebg font-semibold ': isRevenue}">
                    <img src="../../assets/icons/wallet.svg" class="w-8 md:w-auto" alt="">
                    <p class=" text-[#98A2B3]  text-nowrap text-lg lg:text-xl"> Payment</p>
                </div>
            </nuxt-link> -->

        </div>
       
        <div class="flex justify-center items-center">
            <img src="/assets/icons/Aktivate-sidebar-logo.svg" class="object-contain w-auto h-auto" alt="">
        </div>
    </div>
    
    
</template>

 
<script setup lang="ts">
    import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    } from '../../components/ui/dialog'
    const route = useRoute()
    const userStore = useUserStore() 
    const isDashboard = computed<boolean>(()=> route.path === '/brands/dashboard')
    const isCollaborationHub = computed<boolean>(()=> route.path === 'creator/dashboard/collaboration-hub')
    const isCampaign = computed<boolean>(()=> route.path.includes('campaign'))
    const isRevenue = computed<boolean>(()=> route.path.includes('revenue'))
    const isPlatform = computed<boolean>(()=> route.path.includes('platform'))
    const isContent = computed<boolean>(()=> route.path.includes('content'))
    const isReport = computed<boolean>(()=> route.path.includes('report'))
    import {ClipboardPenLine} from 'lucide-vue-next'
    const isOpen = ref(false)
    
    
</script>