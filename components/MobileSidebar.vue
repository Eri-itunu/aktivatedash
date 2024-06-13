<template>
    <div class="flex px-2 h-screen   w-screen">
        <div class="bg-[#090618] overflow-y-scroll  flex flex-col gap-5 relative justify-between  rounded-[20px]" >
            <div class="px-16 pt-12">
                <img src="/assets/icons/AktivateLogo.svg" class="" alt="">

            </div>

            <div class="px-12 flex flex-col gap-5 items-start ">
                

                <nuxt-link @click="toggleSidebar" to='/brands/dashboard'>
                    <div class="flex gap-4 items-start cursor-pointer ">
                        <img src="/assets/icons/category.svg" class="w-8 md:w-auto" alt="">
                        <p class="  text-[#E1DCF7] text-nowrap text-lg lg:text-xl"> Dashboard</p>
                    </div>
                </nuxt-link>

                <nuxt-link @click="toggleSidebar" to='/brands/dashboard/campaigns'>
                    <div class="flex gap-4 items-start cursor-pointer ">
                        <img src="/assets/icons/Group.svg" class="w-8 md:w-auto" alt="">
                        <p class=" text-[#E1DCF7] text-nowrap text-lg lg:text-xl"> Campaigns</p>
                    </div>
                </nuxt-link> 

                <nuxt-link @click="toggleSidebar" to='/brands/dashboard/content'>
                    <div class="flex gap-4 items-start cursor-pointer ">
                        <img src="/assets/icons/Group.svg" class="w-8 md:w-auto" alt="">
                        <p class=" text-[#E1DCF7] text-nowrap text-lg lg:text-xl"> Content</p>
                    </div>
                </nuxt-link> 

                <nuxt-link @click="comingSoon" to="" class="items-start flex gap-4 cursor-pointer">
                    <img src="/assets/icons/wallet.svg" class="w-8 md:w-auto" alt="">
                    <p class="text-[#E1DCF7]  text-lg lg:text-xl">Revenue</p>
                </nuxt-link>
                <nuxt-link @click="comingSoon" to="" class="items-start flex gap-4 cursor-pointer">
                    <img src="/assets/icons/global.svg" class="w-8 md:w-auto" alt="">
                    <p class="text-[#E1DCF7] text-lg lg:text-xl"> Platforms </p>
                </nuxt-link>
            </div>

            <div class="flex justify-center items-center">
                <img src="/assets/icons/Aktivate-sidebar-logo.svg" class="object-contain w-auto h-auto" alt="">

            </div>
        </div>
        <div class="mt-2">
            <button class="rounded-[100%] bg-[#D3D3D3]" >
                <img @click="toggleSidebar" src="../assets/icons/cancel.png" alt="">
            </button>
        </div>

        <Popup title = "Coming Soon" v-if="isOpen" :togglePopup="()=> isOpen = false" :header="true">
            This feature is coming Soon
        </Popup>
    </div>
    
</template>

<script >
export default {
    data() {
        return {
            isOpen: false,
            
        }
    },

  props: {
    toggleSidebar: {
      type: Function,
      required: true
    }
  },

  methods: {
    comingSoon(){
        this.toggleSidebar()
        this.isOpen = true

    }
  }
}
</script>


