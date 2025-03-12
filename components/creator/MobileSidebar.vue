<template>
    <div class="flex px-2 h-screen   w-screen">
        <div class="bg-[#090618] overflow-y-scroll  flex flex-col gap-5 relative justify-between  rounded-[20px]" >
            <div class="px-16 pt-12">

                <img src="/icons/AktivateLogo.svg" class="" alt="">

            </div>

            <div class="px-12 flex flex-col gap-5 items-start ">
                <nuxt-link @click="toggleSidebar" to='/creator/dashboard'>
                    <div class="flex gap-4 items-start cursor-pointer ">
                        <img src="/icons/category.svg" class="w-8 md:w-auto" alt="">
                        <p class=" text-[#E1DCF7] text-lg lg:text-xl">Dashboard</p>
                    </div>
                </nuxt-link>




                <!-- <nuxt-link @click="toggleSidebar" to='/dashboard/collaboration-hub' class="items-start flex gap-4 cursor-pointer  ">
                    <img src="/icons/people.svg" class="w-8 md:w-auto" alt="">
                    <p class="text-[#E1DCF7] text-nowrap text-lg lg:text-xl">Collaboration Hub</p>
                </nuxt-link> -->

                <nuxt-link @click="toggleSidebar" to="/creator/dashboard/campaigns" class="items-start flex gap-4 cursor-pointer">
                    <img src="/icons/Group.svg" class="w-8 md:w-auto" alt="">
                    <p class="text-[#E1DCF7]  text-lg lg:text-xl">Campaigns</p>
                </nuxt-link>

                <nuxt-link @click="toggleSidebar" to="/creator/dashboard/collaborationHub" class="items-start flex gap-4 cursor-pointer">
                    <img src="/icons/Group.svg" class="w-8 md:w-auto" alt="">
                    <p class="text-[#E1DCF7] text-lg lg:text-xl"> Collaboration Hub </p>
                </nuxt-link>

                <!-- <nuxt-link @click="toggleSidebar" to="/dashboard/revenue" class="items-start flex gap-4 cursor-pointer">
                    <img src="/icons/wallet.svg" class="w-8 md:w-auto" alt="">
                    <p class="text-[#E1DCF7]  text-lg lg:text-xl">Revenue</p>
                </nuxt-link> -->
                <nuxt-link @click="toggleSidebar" to="/creator/dashboard/platforms" class="items-start flex gap-4 cursor-pointer">
                    <img src="/icons/global.svg" class="w-8 md:w-auto" alt="">
                    <p class="text-[#E1DCF7] text-lg lg:text-xl"> Platforms </p>
                </nuxt-link>

                <nuxt-link @click="toggleSidebar" to="/creator/dashboard/content" class="items-start flex gap-4 cursor-pointer">
                    <img src="/icons/Group.svg" class="w-8 md:w-auto" alt="">
                    <p class="text-[#E1DCF7] text-lg lg:text-xl"> Content </p>
                </nuxt-link>
            </div>

            <div class="flex justify-center items-center">
                <img src="/icons/Aktivate-sidebar-logo.svg" class="object-contain w-auto h-auto" alt="">

            </div>
        </div>
        <div class="mt-2">
            <button class="rounded-[100%] bg-[#D3D3D3]" >
                <img @click="toggleSidebar" src="/icons/cancel.png" alt="">
            </button>
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
