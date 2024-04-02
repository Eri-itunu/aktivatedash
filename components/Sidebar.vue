<template>
    <div class="bg-[#090618] h-screen flex flex-col gap-5 relative justify-between rounded-[20px]">

        <div class="px-16 pt-12">
            <img src="/assets/icons/AktivateLogo.svg" class="w-48 h-20" alt="">
        </div>

        <div class="px-12 flex flex-col gap-5 ">
            <nuxt-link to='/dashboard'>
                <div class="flex gap-4 cursor-pointer ">
                    <img src="/assets/icons/category.svg" alt="">
                    <p class="text-[#E1DCF7]   text-xl">Dashboard</p>
                </div>
            </nuxt-link>

            <nuxt-link to='/dashboard/collaboration-hub' class="flex gap-4 cursor-pointer  ">
                <img src="/assets/icons/people.svg" alt="">
                <p class="text-[#E1DCF7] text-xl">Collaboration Hub</p>
            </nuxt-link>

            <nuxt-link to="/dashboard/campaigns" class="flex gap-4 cursor-pointer">
                <img src="/assets/icons/Group.svg" alt="">
                <p class="text-[#E1DCF7] text-xl">Campaigns</p>
            </nuxt-link>

            <nuxt-link to="/dashboard/revenue" class="flex gap-4 cursor-pointer">
                <img src="/assets/icons/wallet.svg" alt="">
                <p class="text-[#E1DCF7] text-xl">Revenue</p>
            </nuxt-link>
            <nuxt-link class="flex gap-4">
                <img src="/assets/icons/global.svg" alt="">
                <p class="text-[#E1DCF7] text-xl"> Platforms </p>
            </nuxt-link>
        </div>

        <div class="flex justify-center items-center">
            <img src="/assets/icons/Aktivate-sidebar-logo.svg" class="object-contain w-auto h-auto" alt="">

        </div>
    </div>


</template>