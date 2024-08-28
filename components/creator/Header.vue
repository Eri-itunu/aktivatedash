<script setup lang="ts">
import UserRoles from "../../enums/userRoles";

const route = useRoute();
const userStore = useUserStore();
const isDashboard = computed<boolean>(() => route.path === "/creator/dashboard");
const isCollaborationHub = computed<boolean>(
  () => route.path === "creator/dashboard/collaboration-hub"
);
const isCampaign = computed<boolean>(() => route.path.includes("campaign"));
const isRevenue = computed<boolean>(() => route.path.includes("revenue"));
const isPlatform = computed<boolean>(() => route.path.includes("platform"));
const isProfile = computed<boolean>(() => route.path.includes("profile"));
const isContent = computed<boolean>(() => route.path.includes("content"));
const imgUrl = computed<string>(() => userStore.userProfile?.imgUrl || "");

const props = defineProps({
  toggleSidebar: Function,
});
</script>
<template>
  <div class=" header-print flex justify-between items-center px-2 pb-2">
    <div class="flex gap-4">
      <button class="block lg:hidden" @click="toggleSidebar">
        <div class="w-5 h-1 bg-white mb-1"></div>
        <div class="w-5 h-1 bg-white mb-1"></div>
        <div class="w-5 h-1 bg-white mb-1"></div>
      </button>
      <!-- <img @click="toggleSidebar" src="~/assets/icons/aktivate-logo-small.svg" alt=""> -->
      <p class="text-[#6D6B76] text-sm" v-if="isDashboard">Dashboard</p>
      <p class="text-[#6D6B76] text-sm" v-if="isCollaborationHub">Collaboration Hub</p>
      <p class="text-[#6D6B76] text-sm" v-if="isCampaign">Campaign</p>
      <p class="text-[#6D6B76] text-sm" v-if="isRevenue">Revenue</p>
      <p class="text-[#6D6B76] text-sm" v-if="isPlatform">Platform</p>
      <p class="text-[#E1DCF7] text-lg" v-if="isProfile">Profile</p>
      <p class="text-[#E1DCF7] text-lg" v-if="isContent">Content</p>
    </div>

    <div class="flex items-center gap-2">
      <img src="../assets/icons/notification.svg" alt="" />

      <div>
        <button
          @click="navigateTo('/creator/dashboard/profile')"
          class="cursor-pointer flex justify-around h-9 w-9 rounded-full border-2 border-white overflow-hidden bg-grey1"
        >
          <img v-if="imgUrl" :src="imgUrl" class="object-fit" alt="" />
          <DefaultAvatar
            v-else
            :firstName="userStore.userProfile?.firstName"
            :lastName="userStore.userProfile?.lastName"
          />
        </button>
      </div>
    </div>
  </div>
</template>
<style>
  @media print{

    .header-print{
      display:none
    }
  }
</style>

