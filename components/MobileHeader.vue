<template>
    <div class="flex justify-between px-4 pt-8 pb-2 text-black">
        <Sheet>

            <p class=" text-xl" v-if="isDashboard">Dashboard</p>
            <p class=" text-xl" v-if="isCollaborationHub">Collaboration Hub</p>
            <p class=" text-xl" v-if="isCampaign">Campaign</p>
            <p class=" text-xl" v-if="isRevenue">Revenue</p>
            <p class=" text-xl" v-if="isPlatform">Platform</p>
            <p class="text-lg" v-if="isProfile">Profile</p>
            <p class="text-lg" v-if="isContent">Content</p>
            <div class="flex gap-4">
                <Bell />
                <SheetTrigger> <Menu/> </SheetTrigger>
            </div>

            <SheetContent class="bg-[#F7F5FF] text-black pt-14" side="left">
                <SheetHeader>
                    <SheetTitle><p class="text-lg text-left text-black">Hi, {{ userStore.userProfile?.first_name }}!</p> </SheetTitle>
                    <div class="flex gap-8 flex-col pt-5">
                        <SheetClose as-child>
                            <nuxt-link class=" flex justify-between w-full" to="/creator/dashboard/campaigns" >
                                <div class="flex gap-4 items-center">
                                    <Megaphone />
                                   <p class="text-sm"> Campaign</p>
                                </div>
                                <ChevronRight />
                            </nuxt-link>
                        </SheetClose>

                        <SheetClose as-child>
                            <nuxt-link class=" flex justify-between w-full" to="/creator/dashboard/campaigns" >
                                <div class="flex gap-4 items-center">
                                    <Folder />
                                    <p class="text-sm" >Content</p>
                                </div>
                                <ChevronRight />
                            </nuxt-link>
                        </SheetClose>

                        <SheetClose as-child>
                            <nuxt-link class=" flex justify-between w-full" to="/creator/dashboard/campaigns" >
                                <div class="flex gap-4 items-center">
                                    <CreditCard />
                                   <p class="text-sm" > Revenue</p>
                                </div>
                                <ChevronRight />
                            </nuxt-link>
                        </SheetClose>

                        <SheetClose as-child>
                            <nuxt-link class=" flex justify-between w-full" to="/creator/dashboard/campaigns" >
                                <div class="flex gap-4 items-center">
                                    <UserRound />
                                    <p class="text-sm" > Profile</p>
                                </div>
                                <ChevronRight />
                            </nuxt-link>
                        </SheetClose>

                        <SheetClose as-child>
                            <nuxt-link class=" flex justify-between w-full" to="/creator/dashboard/campaigns" >
                                <div class="flex gap-4 items-center">
                                    <LogOut />
                                    <p class="text-sm">Log out</p>
                                </div>
                            </nuxt-link>
                        </SheetClose>
                        

                       
                    </div>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    </div>
</template>

<script setup lang="ts">
    import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    } from '../components/ui/sheet'
    import {Menu, Bell, ChevronRight, Megaphone, Folder, CreditCard, UserRound, LogOut} from 'lucide-vue-next'

    const userStore = useUserStore();
    const route = useRoute();
    const isDashboard = computed<boolean>(() => route.path === "/creator/dashboard");
    const isCollaborationHub = computed<boolean>(
    () => route.path === "creator/dashboard/collaboration-hub"
    );
    const isCampaign = computed<boolean>(() => route.path.includes("campaign"));
    const isRevenue = computed<boolean>(() => route.path.includes("revenue"));
    const isPlatform = computed<boolean>(() => route.path.includes("platform"));
    const isProfile = computed<boolean>(() => route.path.includes("profile"));
    const isContent = computed<boolean>(() => route.path.includes("content"));
</script>