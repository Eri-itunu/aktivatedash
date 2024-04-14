<template>
    <div class="flex px-2 bg-[#4A5568] bg-opacity-50 w-screen">
        <div class="bg-[#090618] overflow-y-scroll h-screen flex flex-col gap-5 relative justify-between  rounded-[20px]" >
            <div class="px-16 pt-12">
                <img src="/assets/icons/AktivateLogo.svg" class="" alt="">

            </div>

            <div class="px-12 flex flex-col gap-5 items-start ">
                <nuxt-link to='/dashboard'>
                    <div class="flex gap-4 items-start cursor-pointer ">
                        <img src="/assets/icons/category.svg" class="w-8 md:w-auto" alt="">
                        <p class=" text-[#E1DCF7] text-lg lg:text-xl">Dashboard</p>
                    </div>
                </nuxt-link>

                <nuxt-link to='/brands/dashboard'>
                    <div class="flex gap-4 items-start cursor-pointer ">
                        <img src="/assets/icons/category.svg" class="w-8 md:w-auto" alt="">
                        <p class="  text-[#E1DCF7] text-nowrap text-lg lg:text-xl">Brands Dashboard</p>
                    </div>
                </nuxt-link>

                <nuxt-link to='/brands/dashboard/campaigns'>
                    <div class="flex gap-4 items-start cursor-pointer ">
                        <img src="/assets/icons/category.svg" class="w-8 md:w-auto" alt="">
                        <p class=" text-[#E1DCF7] text-nowrap text-lg lg:text-xl">Brands Campaigns</p>
                    </div>
                </nuxt-link>

                <nuxt-link to='/dashboard/collaboration-hub' class="items-start flex gap-4 cursor-pointer  ">
                    <img src="/assets/icons/people.svg" class="w-8 md:w-auto" alt="">
                    <p class="text-[#E1DCF7] text-nowrap text-lg lg:text-xl">Collaboration Hub</p>
                </nuxt-link>

                <nuxt-link to="/dashboard/campaigns" class="items-start flex gap-4 cursor-pointer">
                    <img src="/assets/icons/Group.svg" class="w-8 md:w-auto" alt="">
                    <p class="text-[#E1DCF7]  text-lg lg:text-xl">Campaigns</p>
                </nuxt-link>

                <nuxt-link to="/dashboard/revenue" class="items-start flex gap-4 cursor-pointer">
                    <img src="/assets/icons/wallet.svg" class="w-8 md:w-auto" alt="">
                    <p class="text-[#E1DCF7]  text-lg lg:text-xl">Revenue</p>
                </nuxt-link>
                <nuxt-link to="/dashboard/platforms" class="items-start flex gap-4 cursor-pointer">
                    <img src="/assets/icons/global.svg" class="w-8 md:w-auto" alt="">
                    <p class="text-[#E1DCF7] text-lg lg:text-xl"> Platforms </p>
                </nuxt-link>
            </div>

            <div class="flex justify-center items-center">
                <img src="/assets/icons/Aktivate-sidebar-logo.svg" class="object-contain w-auto h-auto" alt="">

            </div>
        </div>
        <div  >
            <img @click="toggleSidebar" src="../assets/icons/cancel.png" alt="">
        </div>
    </div>
    
</template>

<script>
export default {
  props: {
    toggleSidebar: {
      type: Function,
      required: true
    }
  }
}
</script>


