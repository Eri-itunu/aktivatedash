<template>
  <Head>
    <Meta name="apple-mobile-web-app-capable" , content="yes" />
  </Head>

  <div class=" hidden md:flex h-screen w-screen gap-2 bg-[#100C21] app overflow-clip">
    <div
      class="absolute z-50 flex h-screen items-center lg:hidden duration-700 ease-in-out"
      :class="{ 'left-[-100%] ': !sidebar, 'left-[0]': sidebar }"
    >
      <CreatorMobileSidebar :toggleSidebar="toggleSidebar" />
    </div>
    <div class="hidden py-5 lg:block w-1/5">
      <CreatorSidebar />
    </div>
    <div class="flex flex-col gap-2 py-5 px-2 lg:w-4/5 w-full">
      <CreatorHeader :toggleSidebar="toggleSidebar" />
      <div class="my-scroll text-white">
        <slot />
      </div>
    </div>
  </div>

  <div class="md:hidden bg-white min-h-dvh">

    <MobileHeader/>
    <div class="min-h-screen">
        <slot/>
    </div>
  </div>
</template>

<script setup lang="ts">
const sidebar = ref(false);

const toggleSidebar = () => (sidebar.value = !sidebar.value);
const userStore = useUserStore();



import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../components/ui/sheet'

onBeforeMount(async () => {
  await userStore.getMe();
  await userStore.getProfile();
});
</script>

<style>
.my-scroll {
  overflow-y: scroll;
  scrollbar-width: thin;
}
.app {
  font-family: "Work Sans", sans-serif;
}
</style>
