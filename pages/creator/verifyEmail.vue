<script setup lang="ts">
import type { ResponseMessage } from 'types';
// TODO- fix env and remove local url
const API_URL = process.env.API_URL || "http://localhost:3333/api/v2"

    definePageMeta({
        colorMode: 'light',
    })
    const userStore = useUserStore();
    const toast = useToast()
    const loading = ref(false)


    const resendOTP = async() => {
        const email = userStore.user?.email
        if(!email) {
            console.error("No email provided")
        }
        try{
            loading.value = true
            const res = await $fetch<ResponseMessage>(`${API_URL}/auth/resend-otp`, {
                method: 'post',
                body: {
                    email,
                }
            })
            loading.value = false;
        toast.add({ title: "Please check your email for the new otp" })
        } catch(err: any) {
            console.log({ err })
            toast.add({ title: "Unable to Resend OTP at this time"})
        }
    }
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
            <button @click="resendOTP" class="px-4 py-2 rounded border-2 border-[#5331E8]">
                <p class="text-purple1">
                    Resend OTP
                </p>
            </button>
        </div>
    </div>
</template>