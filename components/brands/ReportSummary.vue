<script setup lang="ts">

import { Pin } from 'lucide-vue-next';
</script>

<template>
    <section  class="flex basis-1/5 flex-col gap-8 bg-[#090618] rounded-lg px-4 pt-4 pb-8 " >
        <p class="flex  items-center" > <Pin class="h-5" />  Key Results</p>

        <div class="flex h-5 items-center justify-center md:space-x-6 lg:space-x-9 text-sm">
            <div>
                <p class="text-[#CDC2FF] text-center">8</p>
                <p>Creators</p>
            </div>
            <Separator class="" orientation="vertical" />
            <div>
                <p class="text-[#CDC2FF] text-center">20</p>
                <p>Content</p>
            </div>
            <Separator orientation="vertical" />
            <div>
                <p class="text-[#CDC2FF] text-center">N5000</p>
                <p>Budget</p>
            </div>
            <Separator orientation="vertical" />
            <div>
                <p class="text-[#CDC2FF] text-center">12.8k</p>
                <p>Engagement</p>
            </div>
            <Separator orientation="vertical" />
            <div>
                <p class="text-[#CDC2FF] text-center">2.3%</p>
                <p>Engegement Rate</p>
            </div>
            <Separator orientation="vertical" />
            <div>
                <p class="text-[#CDC2FF] text-center">3M</p>
                <p>Impressions</p>
            </div>

        </div>
    </section>

    <section class=" print-summary flex flex-col md:flex-row basis-3/5 gap-2 " >
        <div class="bg-[#090618] basis-1/2 h-full rounded-lg p-8">
            <h2 class="font-semibold text-xl" > Top Creators</h2>
        </div>

        <div class="bg-[#090618] flex flex-col gap-4 basis-1/2 h-full rounded-lg p-8">
            <h2 class="font-semibold text-xl" >Campaign Details</h2>

            <div class="flex justify-between">
                <h3 class="text-sm " >Campaign Start:</h3>
                <p>Nov 6, 2023</p>
            </div>
            <div class="flex justify-between">
                <h3 class="text-sm " >Categories:</h3>
                <p>Nov 6, 2023</p>
            </div>
            <div class="flex justify-between">
                <h3 class="text-sm " >Platforms:</h3>
                <p>Nov 6, 2023</p>
            </div>

            <div>
                <h3>Campaign Description:</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, est error quasi, dicta aperiam, distinctio a repellendus consequatur nam porro illum similique aspernatur architecto veniam pariatur sed ratione earum assumenda!</p>
            </div>
        </div>
    </section>
</template>

<style>
    @media print {
        .print-summary{
            display:none
        }
    }
</style>