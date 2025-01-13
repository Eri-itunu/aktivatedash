<script setup lang="ts">
const route = useRoute();
import { ref } from "vue";
import { Lock } from "lucide-vue-next";
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

const isDashboard = computed<boolean>(() => route.path === "creator/dashboard");
const isCollaborationHub = computed<boolean>(
  () => route.path === "creator/dashboard/collaboration-hub"
);
const isCampaign = computed<boolean>(() => route.path.includes("campaign"));
const isRevenue = computed<boolean>(() => route.path.includes("revenue"));
const isPlatform = computed<boolean>(() => route.path.includes("platform"));
const isProfile = computed<boolean>(() => route.path.includes("profile"));


</script>

<template>
  <!--Main Dashboard -->
  <div class="min-h-screen " >
    <ResizablePanelGroup direction="horizontal" class="h-screen items-stretch">

      <!--Side bar -->
      <ResizablePanel
        class="hidden lg:block border-r"
        :min-size="20"
        :max-size="20"
      >
        <div class="flex h-screen flex-col w-full p-2 dark:bg-vDarkBlue">
          <div class=" basis-1/4  z-10 flex flex-col items-center justify-center">
            <img v-if="darkModeStore.darkMode" src="/assets/icons/AktivateLogo.svg" class="" alt="">
           <img v-else src="/assets/images/Logo.svg" alt="">
          </div>

          <div class=" basis-2/4 pl-4 pr-2 flex flex-col gap-4 md:gap-5 items-center md:items-start z-10 ">
            <nuxt-link  to='/brands/dashboard' class="w-full">
                <div class="flex items-center gap-4 cursor-pointer  hover:bg-purplebg hover:bg-opacity-[10%] w-full px-4  py-2 rounded-[100px] hover:text-purplebg  hover:font-semibold "
                :class="{'bg-[#674BE0] dark:bg-purplebg bg-opacity-[10%] text-purplebg font-semibold ': isDashboard}">
                    <img src="/assets/icons/category.svg" class="w-8 md:w-auto" alt="">
                    <p class="  text-purplebtn dark:text-[#98A2B3]  text-nowrap text-lg lg:text-xl"> Dashboard</p>
                </div>
            </nuxt-link>

            <nuxt-link to='/brands/dashboard/campaigns' class="w-full">
                <div class="flex items-center gap-4 cursor-pointer  hover:bg-purplebg hover:bg-opacity-[10%] w-full px-4  py-2 rounded-[100px] hover:text-purplebg  hover:font-semibold "
                :class="{' bg-[#674BE0] dark:bg-purplebg dark:bg-opacity-[10%] bg-opacity-[10%] text-purplebg font-semibold ': isCampaign}">
                    <img src="/assets/icons/Group.svg" class="w-8 md:w-auto" alt="">
                    <p class=" text-purplebtn dark:text-[#98A2B3]  text-nowrap text-lg lg:text-xl"> Campaigns</p>
               </div>
            </nuxt-link>

            <nuxt-link to='/brands/dashboard/collaborationHub' class="w-full">
                <div class="flex items-center gap-4 cursor-pointer  hover:bg-purplebg hover:bg-opacity-[10%] w-full px-4  py-2 rounded-[100px] hover:text-purplebg  hover:font-semibold "
                :class="{' bg-[#674BE0] dark:bg-purplebg dark:bg-opacity-[10%] bg-opacity-[10%] text-purplebg font-semibold ': isCollaborationHub}">
                    <img src="/assets/icons/Group.svg" class="w-8 md:w-auto" alt="">
                    <p class=" text-purplebtn dark:text-[#98A2B3]  text-nowrap text-lg lg:text-xl"> Collaboration Hub</p>
               </div>
            </nuxt-link>

            <!-- <nuxt-link to='/brands/dashboard/report' class="w-full">
                <div class="flex items-center justify-cetner cursor-pointer gap-4  hover:bg-purplebg hover:bg-opacity-[10%] w-full px-4  py-2 rounded-[100px] hover:text-purplebg  hover:font-semibold "
                :class="{'bg-purplebg bg-opacity-[10%] text-purplebg font-semibold ': isReport}">
                    <ClipboardPenLine class="w-6 h-6"/>
                    <p class=" text-black dark:text-[#98A2B3]  text-nowrap text-lg lg:text-xl"> Reporting</p>
               </div>
            </nuxt-link> -->

            <!-- <nuxt-link to='/brands/dashboard/content' class="w-full">
                <div class="flex items-center gap-4 cursor-pointer  hover:bg-purplebg hover:bg-opacity-[10%] w-full px-4  py-2 rounded-[100px] hover:text-purplebg  hover:font-semibold "
                :class="{'bg-purplebg bg-opacity-[10%] text-purplebg font-semibold ': isContent}">
                    <img src="../../assets/icons/Group.svg" class="w-8 md:w-auto" alt="">
                    <p class=" text-black dark:text-[#98A2B3]  text-nowrap text-lg lg:text-xl"> Content</p>
                </div>
            </nuxt-link> -->
                <Dialog class="w-full">
                  <DialogTrigger class="w-full">
                    <div class="flex items-center gap-4 cursor-pointer  hover:bg-purplebg hover:bg-opacity-[10%] w-full px-4  py-2 rounded-[100px] hover:text-purplebg  hover:font-semibold  "
                    :class="{'dark:bg-[#674BE0] bg-purplebg bg-opacity-[10%] text-purplebg font-semibold ': isRevenue}">
                        <img src="/assets/icons/people.svg" class="w-8 md:w-auto" alt="">
                        <p class=" text-purplebtn dark:text-[#98A2B3]  text-nowrap text-lg lg:text-xl"> Influencers</p>
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    Coming Soon!
                  </DialogContent>
                </Dialog>
                

           
          </div>
        </div>
      </ResizablePanel>

      <!--Main page content-->
      <ResizablePanel  :default-size="80">
        <div class="h-screen overflow-auto pb-10 bg-[#F5F5F5] dark:bg-dashbg text-black dark:text-white">
          <header
            class="sticky top-0 flex h-16  gap-4 border-b dark:bg-dashbg bg-white px-4 md:px-6"
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
                  class="flex flex-col gap-12 h-screen bg-[#F5F5F5] dark:bg-dashbg items-center justify-start p-6"
                >
                  <nuxt-link
                    to="/"
                    class="font-semibold flex w-full items-center justify-center"
                  >
                  <img v-if="darkModeStore.darkMode" src="/assets/icons/AktivateLogo.svg" class="" alt="">
                  <img v-else src="/assets/images/Logo.svg" alt="">
                  </nuxt-link>

                  <div
                    class="text-center items-center w-full justify-center flex flex-col"
                  >
                   
                  </div>

                  <div class="flex w-full flex-col">
                    <DialogTrigger>
                      <nuxt-link  to='/brands/dashboard' class="w-full">
                      <div class="flex items-center gap-4 cursor-pointer  hover:bg-purplebg hover:bg-opacity-[10%] w-full px-4  py-2 rounded-[100px] hover:text-purplebg  hover:font-semibold "
                      :class="{'bg-[#674BE0] dark:bg-purplebg bg-opacity-[10%] text-purplebg font-semibold ': isDashboard}">
                          <img src="/assets/icons/category.svg" class="w-8 md:w-auto" alt="">
                          <p class="  text-purplebtn dark:text-[#98A2B3]  text-nowrap text-lg lg:text-xl"> Dashboard</p>
                      </div>
                  </nuxt-link>
                    </DialogTrigger>
                   

                  <DialogTrigger>
                    <nuxt-link to='/brands/dashboard/campaigns' class="w-full">
                      <div class="flex items-center gap-4 cursor-pointer  hover:bg-purplebg hover:bg-opacity-[10%] w-full px-4  py-2 rounded-[100px] hover:text-purplebg  hover:font-semibold "
                      :class="{' bg-[#674BE0] dark:bg-purplebg dark:bg-opacity-[10%] bg-opacity-[10%] text-purplebg font-semibold ': isCampaign}">
                          <img src="/assets/icons/Group.svg" class="w-8 md:w-auto" alt="">
                          <p class=" text-purplebtn dark:text-[#98A2B3]  text-nowrap text-lg lg:text-xl"> Campaigns</p>
                      </div>
                    </nuxt-link>
                  </DialogTrigger>
                  <DialogTrigger>
                    <nuxt-link to='/brands/dashboard/collaborationHub' class="w-full">
                      <div class="flex items-center gap-4 cursor-pointer  hover:bg-purplebg hover:bg-opacity-[10%] w-full px-4  py-2 rounded-[100px] hover:text-purplebg  hover:font-semibold "
                      :class="{' bg-[#674BE0] dark:bg-purplebg dark:bg-opacity-[10%] bg-opacity-[10%] text-purplebg font-semibold ': isCollaborationHub}">
                          <img src="/assets/icons/Group.svg" class="w-8 md:w-auto" alt="">
                          <p class=" text-purplebtn dark:text-[#98A2B3]  text-nowrap text-lg lg:text-xl"> Collaboration Hub</p>
                    </div>
                  </nuxt-link>
                  </DialogTrigger>

                
                  </div>

               
                </div>
              </SheetContent>
            </Sheet>
            <div class="w-full flex justify-between items-center ">
              <div class="flex gap-4">
                
                <!-- <img @click="toggleSidebar" src="~/assets/icons/aktivate-logo-small.svg" alt=""> -->
                <p class="text-black dark:text-[#E1DCF7] text-lg" v-if="isDashboard">Dashboard</p>
                <p class="text-black dark:text-[#E1DCF7] text-lg" v-if="isCollaborationHub">Collaboration Hub</p>
                <p class="text-black dark:text-[#E1DCF7] text-lg" v-if="isCampaign">Campaign</p>
                <p class="text-black dark:text-[#E1DCF7] text-lg" v-if="isRevenue">Revenue</p>
                <p class="text-black dark:text-[#E1DCF7] text-lg" v-if="isPlatform">Platform</p>
                <p class="text-black dark:text-[#E1DCF7] text-lg" v-if="isProfile">Profile</p>
              </div>

              <div class="flex items-center gap-2">
                
                <div class="flex itmes-center gap-2 ">
                  <!-- <button @click="darkModeStore.toggleDarkMode" class="dark:text-white text-black" >
                    toggle darkmode
                  </button> -->


                <Switch class="mt-2 flex items-center" :checked="darkModeStore.isDarkMode" @update:checked="darkModeStore.toggleDarkMode">
                  <template #thumb class="flex items-center w-full h-full">
                    <Moon v-if="darkModeStore.isDarkMode" icon="lucide:moon" class="size-3 mt-1 ml-1" />
                    <Sun v-else icon="lucide:sun" class="size-3 mt-1 ml-1" />
                  </template >
                </Switch>

                  <button
                    @click="navigateTo('/brands/dashboard/profile')"
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
            <div class="p-6">
              <slot />
            </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>

</template>