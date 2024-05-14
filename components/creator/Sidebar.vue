<template>
    <div class="bg-[#090618] h-[98vh] flex flex-col justify-between md:left-0 rounded-[20px]" >

        <div class=" basis-1/4 md:px-16 md:pt-12 z-10">
            <img src="/assets/icons/AktivateLogo.svg" class="" alt="">
        </div>

        <div class="md:pl-5 md:pr-3 basis-2/4 flex flex-col gap-4 mt-10 md:gap-5 items-center md:items-start z-10 ">
            <nuxt-link to='/creator/dashboard'>
                <div class="flex items-center gap-4 cursor-pointer  hover:bg-purplebg hover:bg-opacity-[10%] px-16 py-2 rounded-[100px] hover:text-purplebg  hover:font-semibold "
                :class="{'bg-purplebg bg-opacity-[10%] text-purplebg font-semibold ': isDashboard}">
                    <img src="/assets/icons/category.svg" class="w-8 md:w-auto border-white" alt="">
                    <p class=" text-[#E1DCF7] text-lg  ">Dashboard</p>
                </div>
            </nuxt-link>

            

            <!-- <nuxt-link to='/creator/dashboard/collaboration-hub'>
                <div class="flex  gap-4 cursor-pointer hover:bg-purplebg hover:bg-opacity-[10%] pl-10 pr-5 py-2 rounded-[100px] hover:text-purplebg  hover:font-semibold  hover:text-sm"
                :class="{'bg-purplebg bg-opacity-[10%] text-purplebg font-semibold text-sm': isCollaborationHub}">
                    <img src="/assets/icons/people.svg" class="w-8 ml-5 md:w-auto" alt="">
                    <p class="text-[#E1DCF7]  text-lg ">Collaboration Hub</p>
                </div>
            </nuxt-link> -->

            <nuxt-link to="/creator/dashboard/campaigns">
                <div class="flex items-center gap-4 cursor-pointer hover:bg-purplebg hover:bg-opacity-[10%] px-16 py-2 rounded-[100px] hover:text-purplebg  hover:font-semibold "
                :class="{'bg-purplebg bg-opacity-[10%] text-purplebg font-semibold ': isCampaign}">
                    <img src="/assets/icons/Group.svg" class="w-8 md:w-auto" alt="">
                    <p class="text-[#E1DCF7] text-lg ">Campaigns</p>
                </div>
            </nuxt-link>

            <!-- <nuxt-link to="/creator/dashboard/revenue">
                <div class="flex items-center gap-4 cursor-pointer hover:bg-purplebg hover:bg-opacity-[10%] px-16 py-2 rounded-[100px] hover:text-purplebg  hover:font-semibold "
                :class="{'bg-purplebg bg-opacity-[10%] text-purplebg font-semibold ': isRevenue}">
                    <img src="/assets/icons/wallet.svg" class="w-8 md:w-auto" alt="">
                    <p class="text-[#E1DCF7]  text-lg">Revenue</p>
                </div>
            </nuxt-link> -->

            <nuxt-link to="/creator/dashboard/platforms">
                <div class="flex items-center gap-4 cursor-pointer hover:bg-purplebg hover:bg-opacity-[10%] px-16 py-2 rounded-[100px] hover:text-purplebg  hover:font-semibold "
                :class="{'bg-purplebg bg-opacity-[10%] text-purplebg font-semibold ': isPlatform}">
                    <img src="/assets/icons/global.svg" class="w-8 md:w-auto" alt="">
                    <p class="text-[#E1DCF7] text-lg "> Platforms </p>
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
                return this.$route.path === 'creator/dashboard/collaboration-hub';
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
        }
    }
</script>


