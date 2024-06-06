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
      <button class="black sm:hidden" @click="toggleSidebar">
        <div class="w-5 h-1 bg-gray-600 mb-1"></div>
        <div class="w-5 h-1 bg-gray-600 mb-1"></div>
        <div class="w-5 h-1 bg-gray-600"></div>
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
      <HeadlessMenu>
        <HeadlessMenuButton
          class="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          <img src="/assets/icons/notification.svg" alt="" />
        </HeadlessMenuButton>
        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <HeadlessMenuItems
            class="absolute right-24 top-16 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md border-1 border-[#464160] bg-[#090618] shadow-lg ring-1 ring-black/5 focus:outline-none"
          >
            <div class="px-1 py-1">
              <HeadlessMenuItem v-slot="{ active }">
                <button
                  :class="[
                    active ? 'bg-violet-500 text-white' : 'text-white-900',
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                  ]"
                >
                  Duplicate
                </button>
              </HeadlessMenuItem>
            </div>
            <div class="px-1 py-1">
              <HeadlessMenuItem v-slot="{ active }">
                <button
                  :class="[
                    active ? 'bg-violet-500 text-white' : 'text-white-900',
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                  ]"
                >
                  Archive
                </button>
              </HeadlessMenuItem>
              <HeadlessMenuItem v-slot="{ active }">
                <button
                  :class="[
                    active ? 'bg-violet-500 text-white' : 'text-white-900',
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                  ]"
                >
                  Move
                </button>
              </HeadlessMenuItem>
            </div>
          </HeadlessMenuItems>
        </transition>
      </HeadlessMenu>

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
