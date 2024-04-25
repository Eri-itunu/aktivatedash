<template>
    <div class="bg-[#090618] h-[98vh] flex flex-col justify-between md:left-0 rounded-[20px]" >

        <div class="md:px-16 md:pt-12 z-10">
            <img src="/assets/icons/AktivateLogo.svg" class="" alt="">
        </div>

        <div class="md:px-12 flex flex-col gap-8 md:gap-5 items-center md:items-start z-10 ">
            <nuxt-link to='/creator/dashboard'>
                <div class="flex items-center gap-4 cursor-pointer ">
                    <img src="/assets/icons/category.svg" class="w-8 md:w-auto border-white" alt="">
                    <p class=" text-[#E1DCF7] text-lg lg:text-xl ">Dashboard</p>
                </div>
            </nuxt-link>

            

            <nuxt-link to='/creator/dashboard/collaboration-hub'>
                <div class="flex items-center gap-4 cursor-pointer">
                    <img src="/assets/icons/people.svg" class="w-8 md:w-auto" alt="">
                    <p class="text-[#E1DCF7] text-nowrap text-lg lg:text-xl">Collaboration Hub</p>
                </div>
            </nuxt-link>

            <nuxt-link to="/creator/dashboard/campaigns">
                <div class="flex items-center gap-4 cursor-pointer">
                    <img src="/assets/icons/Group.svg" class="w-8 md:w-auto" alt="">
                    <p class="text-[#E1DCF7] text-lg lg:text-xl">Campaigns</p>
                </div>
            </nuxt-link>

            <nuxt-link to="/creator/dashboard/revenue">
                <div class="flex items-center gap-4 cursor-pointer">
                    <img src="/assets/icons/wallet.svg" class="w-8 md:w-auto" alt="">
                    <p class="text-[#E1DCF7]  text-lg lg:text-xl">Revenue</p>
                </div>
            </nuxt-link>

            <nuxt-link to="/creator/dashboard/platforms">
                <div class="flex items-center gap-4 cursor-pointer">
                    <img src="/assets/icons/global.svg" class="w-8 md:w-auto" alt="">
                    <p class="text-[#E1DCF7] text-lg lg:text-xl"> Platforms </p>
                </div>
            </nuxt-link>
        </div>

        <div class="flex justify-center items-center">
            <img src="/assets/icons/Aktivate-sidebar-logo.svg" class="object-contain w-auto h-auto" alt="">
        </div>
    </div>
</template>


