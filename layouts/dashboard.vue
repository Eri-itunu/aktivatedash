<script setup lang="ts">
import { ref, computed, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { useDarkModeStore } from '@/stores/darkModeStore';
import { 
  ResizablePanelGroup, 
  ResizablePanel, 
  ResizableHandle 
} from '@/components/ui/resizable'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Menu, Moon, Sun } from "lucide-vue-next";

const route = useRoute();
const userStore = useUserStore();
const darkModeStore = useDarkModeStore();
const sidebar = ref(false);

const toggleSidebar = () => (sidebar.value = !sidebar.value);

onBeforeMount(async () => {
  await userStore.getMe();
  await userStore.getProfile();
});

const isDashboard = computed<boolean>(() => route.path === "/creator/dashboard");
const isCampaign = computed<boolean>(() => route.path.includes("campaigns"));
const isCollaborationHub = computed<boolean>(() => route.path.includes("collaborationHub"));
const isPlatform = computed<boolean>(() => route.path.includes("platforms"));
const isContent = computed<boolean>(() => route.path.includes("content"));
const isProfile = computed<boolean>(() => route.path.includes("profile"));
const isProducts = computed<boolean>(() => route.path.includes("products"));

const pageTitle = computed(() => {
  if (isDashboard.value) return "Dashboard";
  if (isCampaign.value) return "Campaigns";
  if (isCollaborationHub.value) return "Collaboration Hub";
  if (isPlatform.value) return "Platforms";
  if (isContent.value) return "Content";
  if (isProfile.value) return "Profile";
  if (isProducts.value) return "Products";
  return "";
});
</script>

<template>
  <div class="h-screen overflow-hidden dark:bg-vDarkBlue bg-white">
    <!-- 🔔 Top Banner -->
    <div v-if="userStore?.userProfile?.bankAccount == null" class="w-full bg-purplebg text-black text-center py-2 px-4 text-sm font-medium z-[100] relative">
      To ensure you get paid, please update your bank details in your <NuxtLink to="/creator/dashboard/profile" class="underline hover:text-yellow-900">profile</NuxtLink> 
    </div>

    <ResizablePanelGroup direction="horizontal" class="h-full">
      <!-- Side bar -->
      <ResizablePanel
        class="hidden lg:block border-r dark:border-gray-800"
        :min-size="15"
        :max-size="25"
        :default-size="20"
      >
        <div class="flex h-full flex-col w-full justify-start px-1 gap-8 dark:bg-vDarkBlue bg-white">
          <div class="flex flex-col items-start px-6 py-6">
            <img v-if="darkModeStore.isDarkMode" src="/icons/AktivateLogo.svg" class="h-[26px]" alt="Aktivate Logo">
            <img v-else src="/images/Logo.svg" class="h-[26px]" alt="Aktivate Logo">
          </div>
          <CreatorSidebar />
        </div>
      </ResizablePanel>

      <ResizableHandle with-handle class="hidden lg:flex" />

      <!-- Main page content -->
      <ResizablePanel :default-size="80" class="flex flex-col">
        <header class="sticky top-0 flex h-[64px] items-center gap-4 border-b dark:border-gray-800 dark:bg-dashbg bg-white px-4 md:px-6 z-40">
          <Sheet v-model:open="sidebar">
            <SheetTrigger as-child>
              <Button variant="outline" size="icon" class="shrink-0 lg:hidden text-black dark:text-white border-gray-200 dark:border-gray-700">
                <Menu class="h-5 w-5" />
                <span class="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" class="p-0 border-none">
              <div class="flex h-full flex-col w-full dark:bg-vDarkBlue bg-white">
                <div class="flex flex-col items-start px-6 py-6 border-b dark:border-gray-800">
                  <img v-if="darkModeStore.isDarkMode" src="/icons/AktivateLogo.svg" class="h-[26px]" alt="Aktivate Logo">
                  <img v-else src="/images/Logo.svg" class="h-[26px]" alt="Aktivate Logo">
                </div>
                <CreatorSidebar class="mt-4" />
              </div>
            </SheetContent>
          </Sheet>

          <div class="flex w-full justify-between items-center">
            <p class="text-[#6D6B76] text-sm font-medium">{{ pageTitle }}</p>

            <div class="flex items-center gap-4">
              <Switch :checked="darkModeStore.isDarkMode" @update:checked="darkModeStore.toggleDarkMode">
                <template #thumb>
                  <Moon v-if="darkModeStore.isDarkMode" class="size-3 mt-1 ml-1" />
                  <Sun v-else class="size-3 mt-1 ml-1" />
                </template>
              </Switch>

              <button
                @click="navigateTo('/creator/dashboard/profile')"
                class="cursor-pointer flex justify-center items-center h-9 w-9 rounded-full border-2 border-white dark:border-gray-700 overflow-hidden bg-gray-100"
              >
                <img v-if="userStore.userProfile?.imgUrl" :src="userStore.userProfile?.imgUrl" class="h-full w-full object-cover" alt="Avatar" />
                <DefaultAvatar
                  v-else
                  :firstName="userStore.userProfile?.firstName"
                  :lastName="userStore.userProfile?.lastName"
                />
              </button>
            </div>
          </div>
        </header>

        <main class="flex-1 overflow-y-auto bg-[#F5F5F5] dark:bg-dashbg p-4 md:p-6">
          <slot />
        </main>
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
</template>

<style scoped>
.app {
  font-family: "Work Sans", sans-serif;
}
</style>