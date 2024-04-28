<template>
    <div class="bg-[#090618] h-[98vh] flex flex-col justify-between md:left-0 rounded-[20px] " >

        <div class="md:px-16 md:pt-12 z-10">
            <img src="/assets/icons/AktivateLogo.svg" class="" alt="">
        </div>

        <div class="md:px-12 flex flex-col gap-8 md:gap-5 items-center md:items-start z-10 ">
            
            <nuxt-link  to='/brands/dashboard'>
                <div class="flex items-center gap-4 cursor-pointer w-full rounded-[100px] px-16 py-2   hover:bg-purplebg hover:bg-opacity-[10%] hover:text-purplebg  hover:font-semibold ">
                    <img src="/assets/icons/category.svg" class="w-8 md:w-auto" alt="">
                    <p class="  text-[#E1DCF7] text-nowrap text-lg lg:text-xl"> Dashboard</p>
                </div>
            </nuxt-link>

            <nuxt-link to='/brands/dashboard/campaigns'>
                <div class="flex items-center gap-4 cursor-pointer  px-16 py-2 rounded-[100px] hover:bg-purplebg hover:bg-opacity-[10%] hover:text-purplebg  hover:font-semibold">
                    <img src="../../assets/icons/Group.svg" class="w-8 md:w-auto" alt="">
                    <p class=" text-[#E1DCF7] text-nowrap text-lg lg:text-xl"> Campaigns</p>
                </div>
            </nuxt-link>

            <nuxt-link to='/brands/dashboard/campaigns'>
                <div class="flex items-center gap-4 cursor-pointer px-16 py-2 rounded-[100px] hover:bg-purplebg hover:bg-opacity-[10%] hover:text-purplebg  hover:font-semibold">
                    <img src="../../assets/icons/people.svg" class="w-8 md:w-auto" alt="">
                    <p class=" text-[#E1DCF7] text-nowrap text-lg lg:text-xl"> Influencers</p>
                </div>
            </nuxt-link>

            <nuxt-link to='/brands/dashboard/campaigns'>
                <div class="flex items-center gap-4 cursor-pointer px-16 py-2 rounded-[100px] text-[#E1DCF7] hover:bg-purplebg hover:bg-opacity-[10%] hover:text-purplebg  hover:font-semibold ">
                    <img src="../../assets/icons/wallet.svg" class="w-8 md:w-auto" alt="">
                    <p class=" text-[#E1DCF7] text-nowrap text-lg lg:text-xl"> Payment</p>
                </div>
            </nuxt-link>

        </div>

        <div class="flex justify-center items-center">
            <img src="/assets/icons/Aktivate-sidebar-logo.svg" class="object-contain w-auto h-auto" alt="">
        </div>
    </div>
</template>


