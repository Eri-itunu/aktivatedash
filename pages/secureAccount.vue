<script>
import Password from '../components/password.vue';

 definePageMeta({
  colorMode: 'light',
})
</script>

<template>
    <div class="p-4">
        <signBlackButton message="Login"  />
    </div>

    <div class="px-4 md:px-16 mb-24 flex flex-col gap-6">
        <h2 class="text-3xl font-semibold">Secure your Account</h2>
        <p class="text-[#6D6B76]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
    </div>

    <div class="flex flex-col gap-20">
        <div class="flex flex-col  md:flex-row gap-4 w-full px-4 md:px-16">
                
                <div class="flex flex-col w-full md:w-1/2">
                    <Password placeholder="Enter Password" />
                </div>
        
                <div class="flex flex-col w-full md:w-1/2">
                    <Password placeholder="Enter new Password"/>
                </div>
                
            </div>
        
            <nuxt-link to="/dashboard">
                <authButton message="Go To Dashboard "/>
            </nuxt-link>
    </div>
</template>