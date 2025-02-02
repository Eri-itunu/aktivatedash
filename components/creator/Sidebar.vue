<template>
    <div class="bg-[#090618] h-[98vh] flex flex-col  md:left-0 rounded-[20px]" >

        <div class=" basis-1/4 pl-4 md:pt-6 z-10">
            <img src="/assets/icons/AktivateLogo.svg" class="" alt="">
        </div>

        <div class=" basis-2/4 pl-4 pr-2 flex flex-col gap-4 md:gap-5 items-center md:items-start z-10 ">
            <nuxt-link to='/creator/dashboard' class="w-full">
               <div class="flex items-center gap-4 cursor-pointer  hover:bg-purplebg hover:bg-opacity-[10%] w-full px-4  py-2 rounded-[100px] hover:text-purplebg  hover:font-semibold "
                :class="{'bg-purplebg bg-opacity-[10%] text-purplebg font-semibold ': isDashboard}">
                    <img src="/assets/icons/category.svg" class="w-8 md:w-auto border-white" alt="">
                    <p class=" text-[#98A2B3] text-lg  ">Dashboard</p>
                </div>
            </nuxt-link>
 
            

            <!-- <nuxt-link to='/creator/dashboard/collaboration-hub'>
                <div class="flex  gap-4 cursor-pointer hover:bg-purplebg hover:bg-opacity-[10%] pl-10 pr-5 py-2 rounded-[100px] hover:text-purplebg  hover:font-semibold  hover:text-sm"
                :class="{'bg-purplebg bg-opacity-[10%] text-purplebg font-semibold text-sm': isCollaborationHub}">
                    <img src="/assets/icons/people.svg" class="w-8 ml-5 md:w-auto" alt="">
                    <p class="text-[#E1DCF7]  text-lg ">Collaboration Hub</p>
                </div>
            </nuxt-link> -->

            <nuxt-link to="/creator/dashboard/campaigns" class="w-full">
                <div class="flex items-center gap-4 cursor-pointer hover:bg-purplebg hover:bg-opacity-[10%] py-2 w-full px-4 rounded-[100px] hover:text-purplebg  hover:font-semibold "
                :class="{'bg-purplebg bg-opacity-[10%] text-purplebg font-semibold ': isCampaign }">
                    <img src="/assets/icons/Group.svg" class="w-8 md:w-auto" alt="">
                    <p class="text-[#98A2B3] text-lg ">Campaigns</p>
                </div>
            </nuxt-link>

            <nuxt-link to="/creator/dashboard/collaborationHub" class="w-full">
                <div class="flex items-center gap-4 cursor-pointer hover:bg-purplebg hover:bg-opacity-[10%] py-2 w-full px-4 rounded-[100px] hover:text-purplebg  hover:font-semibold "
                :class="{'bg-purplebg bg-opacity-[10%] text-purplebg font-semibold ': isCollaborationHub}">
                    <img src="/assets/icons/Group.svg" class="w-8 md:w-auto" alt="">
                    <p class="text-[#98A2B3] text-lg ">Collaboration Hub</p>
                </div>
            </nuxt-link>

            <!-- <nuxt-link to="/creator/dashboard/revenue">
                <div class="flex items-center gap-4 cursor-pointer hover:bg-purplebg hover:bg-opacity-[10%] py-2 rounded-[100px] hover:text-purplebg  hover:font-semibold "
                :class="{'bg-purplebg bg-opacity-[10%] text-purplebg font-semibold ': isRevenue}">
                    <img src="/assets/icons/wallet.svg" class="w-8 md:w-auto" alt="">
                    <p class="text-[#E1DCF7]  text-lg">Revenue</p>
                </div>
            </nuxt-link> -->

            <nuxt-link to="/creator/dashboard/platforms" class="w-full">
                <div class="flex  gap-4 cursor-pointer hover:bg-purplebg hover:bg-opacity-[10%] py-2 w-full px-4 rounded-[100px] hover:text-purplebg  hover:font-semibold "
                :class="{'bg-purplebg bg-opacity-[10%] text-purplebg font-semibold ': isPlatform}">
                    <img src="/assets/icons/global.svg" class="w-8 md:w-auto" alt="">
                    <p class="text-[#98A2B3] text-lg text-left"> Platforms </p>
                </div>
            </nuxt-link>

            <nuxt-link to="/creator/dashboard/content" class="w-full">
                <div class="flex items-center gap-4 cursor-pointer hover:bg-purplebg hover:bg-opacity-[10%] py-2 w-full px-4 rounded-[100px] hover:text-purplebg  hover:font-semibold "
                :class="{'bg-purplebg bg-opacity-[10%] text-purplebg font-semibold ': isContent}">
                    <img src="/assets/icons/Group.svg" class="w-8 md:w-auto" alt="">
                    <p class="text-[#98A2B3] text-lg "> Content </p>
                </div>
            </nuxt-link>
        </div>


        <div class="flex basis-1/4 justify-center items-center">
            <img src="/assets/icons/Aktivate-sidebar-logo.svg" class="object-contain w-auto h-auto" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            isDashboard() {
            return this.$route.path === '/creator/dashboard'  ;
            },
            isCollaborationHub(){
                return this.$route.path.includes("collaborationHub");
            },
            isCampaign(){
                return this.$route.path.includes('campaigns');
            },
            isRevenue(){
                return this.$route.path === '/creator/dashboard/revenue' ;
            },
            isPlatform(){
                return this.$route.path.includes('platform');
            },
            isContent(){
                return this.$route.path.includes('content');
            },
        }
    }
</script>


