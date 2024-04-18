<script setup lang="ts">
    definePageMeta({
    layout: 'dashboard',
    

    })
</script>

<template>
    <div class="px-2 flex flex-col gap-2">


        <div class="flex justify-between px-2 items-center mt-4">
            <div class="flex gap-2 items-center">
                <img src="../../../assets/icons/Frame 427321372.svg" alt="">
                Content
            </div>

            <div class="w-20 h-px bg-[#464160]"></div>

            <div  class="flex gap-2 items-center">
                <img src="../../../assets/icons/Frame 427321372-2.svg" alt="">
                Infleuncers
            </div>

            <div class="w-20 h-px bg-[#464160]"></div>

            <div class="flex gap-2 items-center">
                <img src="../../../assets/icons/Frame 427321372-3.svg" alt="">
                Budget and Duration
            </div>

            <div class="w-20 h-px bg-[#464160]"></div>

            <div class="flex gap-2 items-center">
                <img src="../../../assets/icons/Frame 427321372-4.svg" alt="">
                Review
            </div>

            
            
            
        </div>

        <div class="bg-vDarkBlue  p-8">
            <p>Campaign Headline</p>
            <input class="border-2 rounded-md w-full bg-transparent " type="text" placeholder="E.g: Launching a new product in Lagos...">

        </div>
    </div>
</template>