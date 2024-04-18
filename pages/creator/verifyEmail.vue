<script setup lang="ts">
    definePageMeta({
        colorMode: 'light',
    })
    const userStore = useUserStore();
    
</script>

<template>

    <div class="flex flex-col gap-10">
        <nuxt-link to="/creator/login">
            <signBlackButton message="Login"  />
        </nuxt-link>
        <div class="px-16 mb-12 flex flex-col gap-5">
            <h2 class="text-3xl font-semibold">Verify Email Address</h2>
            <p>Enter the OTP sent to {{userStore.user?.email }}</p>
        </div>

       <div class="px-16">
            <OTPCard/>
       </div>

        

        <div class=" px-2 md:px-16">
            <button class="px-4 py-2 rounded border-2 border-[#5331E8]">
                <p class="text-purple1">
                    Resend OTP
                </p>
            </button>
        </div>
    </div>
</template>