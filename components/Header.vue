<script setup lang="ts">
import UserRoles from "../enums/userRoles";

const route = useRoute();
const userStore = useUserStore();
const isDashboard = computed<boolean>(() => route.path === "creator/dashboard");
const isCollaborationHub = computed<boolean>(
  () => route.path === "creator/dashboard/collaboration-hub"
);
const isCampaign = computed<boolean>(() => route.path.includes("campaign"));
const isRevenue = computed<boolean>(() => route.path.includes("revenue"));
const isPlatform = computed<boolean>(() => route.path.includes("platform"));
const isProfile = computed<boolean>(() => route.path.includes("profile"));

const imgUrl = computed<string>(() => userStore.userProfile?.img_url || "");

const goToProfile = () => {
  if (userStore.user && userStore.user.role_id === UserRoles.CREATOR) {
    navigateTo("/creator/dashboard/profile");
  }

  if (userStore.user && userStore.user.role_id === UserRoles.BRAND) {
    navigateTo("/brands/dashboard/profile");
  }
};

const props = defineProps({
  toggleSidebar: Function,
});
</script>

<template>
  <div class="flex justify-between items-center px-4 pb-2">
    <div class="flex gap-4">
      <button class="black lg:hidden" @click="toggleSidebar">
        <div class="w-5 h-1 bg-white mb-1"></div>
        <div class="w-5 h-1 bg-white mb-1"></div>
        <div class="w-5 h-1 bg-white"></div>
      </button>
      <!-- <img @click="toggleSidebar" src="~/assets/icons/aktivate-logo-small.svg" alt=""> -->
      <p class="text-[#E1DCF7] text-lg" v-if="isDashboard">Dashboard</p>
      <p class="text-[#E1DCF7] text-lg" v-if="isCollaborationHub">Collaboration Hub</p>
      <p class="text-[#E1DCF7] text-lg" v-if="isCampaign">Campaign</p>
      <p class="text-[#E1DCF7] text-lg" v-if="isRevenue">Revenue</p>
      <p class="text-[#E1DCF7] text-lg" v-if="isPlatform">Platform</p>
      <p class="text-[#E1DCF7] text-lg" v-if="isProfile">Profile</p>
    </div>

    <div class="flex items-center gap-2">
      
      <div>
        <button
          @click="navigateTo('/brands/dashboard/profile')"
          class="cursor-pointer flex justify-center items-center h-9 w-9 rounded-full border-2 border-white overflow-hidden"
        >
          <img v-if="imgUrl" :src="imgUrl" class="object-fit" alt="" />
          <DefaultAvatar
            v-else
            :firstName="userStore.userProfile?.first_name"
            :lastName="userStore.userProfile?.last_name"
          />
        </button>
      </div>
    </div>
  </div>
</template>

=
