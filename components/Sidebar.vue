<template>
    <div class="bg-[#090618] h-screen flex flex-col gap-5 relative justify-between rounded-[20px]">

        <div class="md:px-16 md:pt-12">
            <img src="/assets/icons/AktivateLogo.svg" class="hidden md:block" alt="">

        </div>

        <div class="md:px-12 flex flex-col gap-8 md:gap-5 items-center md:items-start ">
            <nuxt-link to='/dashboard'>
                <div class="flex gap-4 cursor-pointer ">
                    <img src="/assets/icons/category.svg" class="w-8 md:w-auto" alt="">
                    <p class="hidden md:block text-[#E1DCF7] text-lg lg:text-xl">Dashboard</p>
                </div>
            </nuxt-link>

            <nuxt-link to='/dashboard/collaboration-hub' class="flex gap-4 cursor-pointer  ">
                <img src="/assets/icons/people.svg" class="w-8 md:w-auto" alt="">
                <p class="text-[#E1DCF7] hidden md:block text-lg lg:text-xl">Collaboration Hub</p>
            </nuxt-link>

            <nuxt-link to="/dashboard/campaigns" class="flex gap-4 cursor-pointer">
                <img src="/assets/icons/Group.svg" class="w-8 md:w-auto" alt="">
                <p class="text-[#E1DCF7] hidden md:block text-lg lg:text-xl">Campaigns</p>
            </nuxt-link>

            <nuxt-link to="/dashboard/revenue" class="flex gap-4 cursor-pointer">
                <img src="/assets/icons/wallet.svg" class="w-8 md:w-auto" alt="">
                <p class="text-[#E1DCF7] hidden md:block text-lg lg:text-xl">Revenue</p>
            </nuxt-link>
            <nuxt-link to="/dashboard/platforms" class="flex gap-4 cursor-pointer">
                <img src="/assets/icons/global.svg" class="w-8 md:w-auto" alt="">
                <p class="text-[#E1DCF7] hidden md:block text-lg lg:text-xl"> Platforms </p>
            </nuxt-link>
        </div>

        <div class="flex justify-center items-center">
            <img src="/assets/icons/Aktivate-sidebar-logo.svg" class="object-contain w-auto h-auto" alt="">

        </div>
    </div>


</template>