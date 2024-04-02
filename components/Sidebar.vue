<template>
    <div class="bg-[#090618] h-screen flex flex-col gap-5 relative justify-between rounded-[20px]">

       <div class="px-16 pt-12">
            <img src="/assets/icons/AktivateLogo.svg" class="w-48 h-20" alt="">
       </div>

        <div class="px-16 flex flex-col gap-8 ">
            <nuxt-link to='/dashboard' >
                <div class="flex gap-4 cursor-pointer ">
                    <img src="/assets/icons/category.svg" alt="">
                    <p class="text-[#E1DCF7]   text-2xl">Dashboard</p>
                </div>
            </nuxt-link>

            <nuxt-link to='/dashboard/campaigns' class="flex gap-4 cursor-pointer  ">
                <img src="/assets/icons/people.svg" alt="">
                <p class="text-[#E1DCF7] text-2xl">Collaboration Hub</p>
            </nuxt-link>

            <nuxt-link to="/dashboard/collaboration-hub" class="flex gap-4 cursor-pointer">
                <img src="/assets/icons/Group.svg" alt="">
                <p class="text-[#E1DCF7] text-2xl">Campaigns</p>
            </nuxt-link>

            <nuxt-link to="/dashboard/revenue" class="flex gap-4 cursor-pointer">
                <img src="/assets/icons/wallet.svg" alt="">
                <p class="text-[#E1DCF7] text-2xl">Revenue</p>
            </nuxt-link>
            <nuxt-link class="flex gap-4">
                <img src="/assets/icons/global.svg" alt="">
                <p class="text-[#E1DCF7] text-2xl"> Platforms </p>
            </nuxt-link>
        </div>
        
        <div class="">
            <img src="/assets/icons/Aktivate-sidebar-logo.svg" class="w-full h-80" alt="">
            
        </div>
    </div>

        
</template>