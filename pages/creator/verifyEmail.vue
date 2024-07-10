<script setup lang="ts">


  
import UserRoles from "../../enums/userRoles";
import type { ResponseMessage } from "types";
  const config = useRuntimeConfig()
  const API_URL = config.public.API_URL || "http://localhost:3333/api/v2"

    definePageMeta({
        colorMode: 'light',
    })
    const userStore = useUserStore();
    const toast = useToast() 
    const loading = ref(false)
    const count = ref(175)
    const disabled = ref(true)
    const otp = ref()
    const countdown = () =>{
        let timer = setInterval(function(){
        if(count.value <= 1){
            disabled.value = false
            clearInterval(timer);
        }
        count.value -= 1;
        }, 1000);
    }
    countdown()


const submitOTP = async() => {
    const email = userStore.user?.email;
    const pass = otp.value
    try {
        loading.value = true
        const res = await $fetch<ResponseMessage>(`${API_URL}/auth/verify-email`, {
            method: 'post',

            body: { email, otp: pass }
        })
        loading.value = false;
        toast.add({ title: res.message })
        if(res.error) {
            return
        }
        if( userStore.user?.role_id === UserRoles.CREATOR) {
            navigateTo("/creator/login", { replace: true })
        }
    } catch (err: any) {
        loading.value = false
        err.value = true
        if(err.data.message) {
            toast.add({ title: err.data.message})
        }
    }
}




    const resendOTP = async() => {
        const email = userStore.user?.email
        if(!email) {
            toast.add({ title: "No email provided" })

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
        count.value=120
        disabled.value=true
        countdown()
        } catch(err: any) {

            toast.add({ title: "Unable to Resend OTP at this time"})
        }
    }
</script>

<template>

    <div class="flex flex-col gap-10 pb-5">
        <nuxt-link to="/creator/login">
            <signBlackButton message="Login"  />
        </nuxt-link>
        <div class=" px-2 md:px-16 mb-12 flex flex-col gap-5">
            <h2 class="text-3xl font-semibold">Verify Email Address</h2>
            <p>Enter the OTP sent to {{userStore.user?.email }}</p>
        </div>

       <div class=" px-2 md:px-16">
            
            <div class="flex items-center justify-center w-full">
                <input type="text"  maxlength="6" min="6"  max="6" required v-model="otp" class="w-full text-center md:w-1/3 border-2 border-purple1 rounded-lg p-2">
            </div>
            <div class="flex justify-end">
                <p class="font-bold">OTP expires in: <span class="text-purple1 font-bold">{{count}} seconds</span> </p>
            </div>
       </div>

        <div class=" px-2 md:px-16 flex gap-2">
            <button :disabled="disabled" @click="resendOTP" class="px-4 py-2 rounded border-2 border-purple1">
                <p class="text-purple1">
                    Resend OTP
                </p>
            </button>
            <button  @click="submitOTP" class="px-4 py-2 rounded border-2 border-purple1">
                <p class="text-purple1">
                     Verify Email
                </p>
            </button>
        </div>
    </div>
</template>