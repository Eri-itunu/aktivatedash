<script setup lang="ts">
    definePageMeta({
        layout: "brands",
    });
    import { Plus } from 'lucide-vue-next';

</script>

<template>
    <div class=" text-white px-8 flex flex-col gap-4 min-h-screen" >
        <header>
            <h1 class="font-bold" >My campaigns</h1>
            <p>Create a campaign and connect with creators who will deliver the content you need</p>
        </header>

        <div class="w-full flex gap-3">
            <input type="text" class="bg-[#090618] border-[#1D192F] w-full  focus:outline-none focus:ring p-2" placeholder="Search Campaigns" />
            <nuxt-link to="collaborationHub/campaign" class=" flex gap-2 items-center bg-[#5D43CB] px-2 text-xs rounded-[8px] min-w-fit" >
                <Plus/>
                New Campaign
            </nuxt-link>
        </div>
    </div>
</template>