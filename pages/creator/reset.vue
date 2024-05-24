<script lang="ts" setup>

import { ref } from 'vue';

definePageMeta({
    colorMode: 'light',
})

const loading = ref(false);
const email = ref<string>("");

const resetEmail = () =>{
    
}

</script>



<template>
    <nuxt-link to="/creator">
        <div class="p-4">
            <signBlackButton message="Sign Up"  />
        </div>
    </nuxt-link>

    <div class="px-4 md:px-16 mb-24 flex flex-col gap-6">
        <h2 class="text-3xl font-semibold">Reset Password</h2>
       
    </div>

    <div class="flex flex-col gap-10">
        <div class="flex flex-col items-center md:flex-row gap-4 w-full px-4 md:px-16">
            <div class="flex flex-col w-full ">
                <label for="">Email </label>
                <input v-model="email" type="email" placeholder="Your Email Address" class="border rounded border-black py-3 px-2">
            </div>
            
           
        </div>
        

        <div  class="pb-5 md:pb-0" >
            <authButton @click="resetEmail" message="Send Email Reset Link" :loading="loading"/>
        </div>
    </div>
</template>