<script setup>

definePageMeta({
  colorMode: 'light',
})

import {ref} from "vue"
const social = ref('Link Instagram')

</script>

<template>
    <nuxt-link to="/creator/login">
        <div class="p-4">
            <signBlackButton message="Login"  />
        </div>
    </nuxt-link>

    <div class="px-4 md:px-16 mb-24 flex flex-col gap-6">
        <h2 class="text-3xl font-semibold">Add Social Media</h2>
        <!-- <p class="text-[#6D6B76]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p> -->
    </div>

    <div class="flex flex-row gap-2 items-center px-3 md:px-56 mb-10 justify-between">
        <button class=" border-4 border-purple1 rounded-full items-center p-0.5">
            <img class="" src="/assets/icons/x.svg" alt="">
        </button>
        <button class=" border-4 border-purple1 rounded-full items-center p-0.5">
            <img class="object-contain" src="/assets/icons/Insta.svg" alt="">
        </button>
        <button class=" border-4 border-purple1 rounded-full items-center p-0.5">
            <img class="object-contain" src="/assets/icons/snapchat.svg" alt="">
        </button>
        <button class=" border-4 border-purple1 rounded-full items-center p-0.5">
            <img class="object-contain" src="/assets/icons/tiktok.svg" alt="">
        </button>
        <button class=" border-4 border-purple1 rounded-full items-center p-0.5">
            <img class="object-contain" src="/assets/icons/facebook.svg" alt="">
        </button>




    </div>

    <div class="flex flex-col gap-20">
        <nuxt-link to="/dashboard">
            <authButton :message="social"/>
        </nuxt-link>
    </div>

    <div class="items-center justify-center mt-5">
        <p class="text-center underline-offset-auto">Skip</p>
    </div>
</template>