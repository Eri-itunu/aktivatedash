<template>
    <v-app class="app">

        <div class="flex app h-screen w-screen gap-2 bg-[#100C21] px-2 pr-4 overflow-clip">
            <div class="absolute z-50 flex h-screen items-center lg:hidden duration-700 ease-in-out"
            :class="{ 'left-[-100%] ': !sidebar, 'left-[0]': sidebar }">
                <MobileSidebar :toggleSidebar = "toggleSidebar" />
            </div>
            <div class= "hidden py-5 lg:block w-1/4">
                <brandsSidebar  />
            </div>
            <div class="flex flex-col gap-2 py-5 lg:w-3/4 w-full">
                <Header :toggleSidebar = "toggleSidebar" />
                <div class="my-scroll ">
                    <slot/>
                </div>
            </div>
        </div>
    </v-app>
</template>

<script setup lang="ts">
    definePageMeta({
    colorMode: 'dark'
    })
    const sidebar = ref(false)

    const toggleSidebar = () => sidebar.value = !sidebar.value;
    const userStore = useUserStore()

    watchEffect(async() => {
        await userStore.getMe()
        await userStore.getProfile()
    })
</script>

<style scoped>
  .my-scroll {
    overflow-y: scroll;
    scrollbar-width: thin;
  }
.app {
  font-family: 'Work Sans', sans-serif;
}
</style>