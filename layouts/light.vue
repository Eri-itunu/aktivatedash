<script setup lang="ts">
const route = useRoute();
import { ref } from "vue";
import { Lock , LayoutDashboard, Handshake,UsersRound} from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import {
  Menu,
  Moon,
  Sun,
  ChevronRight,
} from "lucide-vue-next";
import { useToast } from "@/components/ui/toast/use-toast";

const config = useRuntimeConfig();
import { useDarkModeStore } from '@/stores/darkModeStore'
const darkModeStore = useDarkModeStore()
const { toast } = useToast();
const API_URL = config.public.API_URL;
const email = ref();
const userStore = useUserStore();

onBeforeMount(async () => {
    await userStore.getMe();
    await userStore.getProfile();
  });

const isDashboard = computed<boolean>(() => route.path === "/brands/dashboard");
const isCollaborationHub = computed<boolean>(
  () => route.path.includes("/brands/dashboard/collaborationHub")
);
const isCampaign = computed<boolean>(() => route.path.includes("dashboard/campaign"));
const isRevenue = computed<boolean>(() => route.path.includes("revenue"));
const isPlatform = computed<boolean>(() => route.path.includes("platform"));
const isProfile = computed<boolean>(() => route.path.includes("profile"));
const isVoucher = computed<boolean>(() => route.path.includes("voucher"));

const goToProfile = ()=>{
  navigateTo('/brands/dashboard/profile')
}

</script>

<template>
  <!--Main Dashboard -->
  <div class=" " >
    <ResizablePanelGroup direction="horizontal" class="h-screen overflow-hidden">

      <!--Side bar -->
      <ResizablePanel
        class="hidden lg:block border-r"
        :min-size="20"
        :max-size="20"
      >
        <div class="flex h-screen flex-col w-full justify-start px-1 gap-8 dark:bg-vDarkBlue">
          <div class="  flex flex-col items-start  px-6 py-4 ">
            <img v-if="darkModeStore.darkMode" src="/icons/AktivateLogo.svg" class="h-[26px]" alt="">
            <img v-else src="/images/Logo.svg" class="h-[26px]" alt="">
          </div>

          <BrandsNavLinks/>
        </div>
      </ResizablePanel>

      <!--Main page content-->
      <ResizablePanel  :default-size="80"  class=" overflow-scroll" >
        <div class=" overflow-scroll  bg-[#F5F5F5] dark:bg-dashbg text-black dark:text-white">
          <header
            class="sticky top-0 flex h-[64px]  gap-4 border-b dark:bg-dashbg bg-white px-4 md:px-6"
          >
            <Sheet class="p-0" >
              <SheetTrigger as-child>
                <Button
                  variant="outline"
                  size="icon"
                  class="shrink-0 mt-3 lg:hidden"
                >
                  <Menu class="h-5 w-5" />
                  <span class="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div
                  class="flex flex-col gap-10 h-screen items-center justify-start"
                >
                  <div
                    
                    class="font-semibold flex w-full items-center justify-center"
                  >
                  <img v-if="darkModeStore.darkMode" src="/icons/AktivateLogo.svg" class="" alt="">
                  <img v-else src="/images/Logo.svg" alt="">
                  </div>



                  <div class="flex w-full flex-col">
                    <DialogTrigger>
                      <nuxt-link  to='/brands/dashboard' class="w-full">
                      <div class="flex items-center gap-4 cursor-pointer  hover:bg-[#E9E9FE] w-full px-4  py-2 rounded hover:text-purplebg  hover:font-semibold "
                      :class="{'bg-[#674BE0] dark:bg-purplebg dark:bg-opacity-[10%] bg-opacity-[10%] text-purplebg font-semibold': isDashboard}">
                          <img src="/icons/category.svg" class="w-8 md:w-auto" alt="">
                          <p class="  text-purplebtn dark:text-[#98A2B3]  text-nowrap text-lg lg:text-xl"> Dashboard

                          </p>
                      </div>
                  </nuxt-link>
                    </DialogTrigger>


                  <!-- <DialogTrigger>
                    <nuxt-link to='/brands/dashboard/campaigns' class="w-full">
                      <div class="flex items-center gap-4 cursor-pointer  hover:bg-purplebg w-full px-4  py-2 rounded hover:text-purplebg  hover:font-semibold "
                      :class="{' bg-[#674BE0] dark:bg-purplebg dark:bg-opacity-[10%] bg-opacity-[10%] text-purplebg font-semibold ': isCampaign}">
                          <img src="/icons/Group.svg" class="w-8 md:w-auto" alt="">
                          <p class=" text-purplebtn dark:text-[#98A2B3]  text-nowrap text-lg lg:text-xl"> Campaigns</p>
                      </div>
                    </nuxt-link>
                  </DialogTrigger> -->
                  <DialogTrigger>
                    <nuxt-link to='/brands/dashboard/collaborationHub' class="w-full">
                      <div class="flex items-center gap-4 cursor-pointer  hover:bg-purplebg w-full px-4  py-2 rounded hover:text-purplebg  hover:font-semibold "
                      :class="{' bg-[#674BE0] dark:bg-purplebg dark:bg-opacity-[10%] bg-opacity-[10%] text-purplebg font-semibold ': isCollaborationHub}">
                          <img src="/icons/Group.svg" class="w-8 md:w-auto" alt="">
                          <p class=" text-purplebtn dark:text-[#98A2B3]  text-nowrap text-lg lg:text-xl"> Collaboration Hub</p>
                    </div>
                  </nuxt-link>
                  </DialogTrigger>

                  <!-- <DialogTrigger>
                    <nuxt-link to='/brands/dashboard/voucher' class="w-full">
                      <div class="flex items-center gap-4 cursor-pointer  hover:bg-purplebg w-full px-4  py-2 rounded hover:text-purplebg  hover:font-semibold "
                      :class="{' bg-[#674BE0] dark:bg-purplebg dark:bg-opacity-[10%] bg-opacity-[10%] text-purplebg font-semibold ': isVoucher}">
                          <img src="/icons/Group.svg" class="w-8 md:w-auto" alt="">
                          <p class=" text-purplebtn dark:text-[#98A2B3]  text-nowrap text-lg lg:text-xl"> Voucher</p> 
                    </div>
                  </nuxt-link>
                  </DialogTrigger> -->


                  </div>


                </div>
              </SheetContent>
            </Sheet>
            <div class="w-full flex justify-between items-center bg-white dark:bg-dashbg z-50 ">
              <div class="flex gap-4">

                <!-- <img @click="toggleSidebar" src="/icons/aktivate-logo-small.svg" alt=""> -->
                <p class=" dark:text-[#6D6B76] text-sm " v-if="isDashboard">Dashboard</p>
                <p class=" dark:text-[#6D6B76] text-sm " v-if="isCollaborationHub">Collaboration Hub</p>
                <p class=" dark:text-[#6D6B76] text-sm " v-if="isCampaign">Campaign</p>
                <p class=" dark:text-[#6D6B76] text-sm " v-if="isRevenue">Revenue</p>
                <p class=" dark:text-[#6D6B76] text-sm " v-if="isPlatform">Platform</p>
                <p class=" dark:text-[#6D6B76] text-sm " v-if="isProfile">Profile</p>
              </div>

              <div class="flex items-center gap-2 ">

                <div class="flex itmes-center gap-2 ">
                  
                <Switch class="mt-2 flex items-center" :checked="darkModeStore.isDarkMode" @update:checked="darkModeStore.toggleDarkMode">
                  <template #thumb class="flex items-center w-full h-full">
                    <Moon v-if="darkModeStore.isDarkMode" icon="lucide:moon" class="size-3 mt-1 ml-1" />
                    <Sun v-else icon="lucide:sun" class="size-3 mt-1 ml-1" />
                  </template >
                </Switch>

                  <button
                    @click="goToProfile"
                    class="cursor-pointer flex justify-center items-center h-9 w-9 rounded-full border-2 border-white overflow-hidden"
                  >
                    <img v-if="userStore.userProfile?.imgUrl" :src="userStore.userProfile?.imgUrl" class="object-fit" alt="" />
                    <DefaultAvatar
                      v-else
                      :firstName="userStore.userProfile?.firstName"
                      :lastName="userStore.userProfile?.lastName"
                    />
                  </button>
                </div>
              </div>
            </div>
          </header>
             <div class="h-[90vh]  ">
              <slot />
            </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>

</template>
