<template>
    <div class="h-screen text-black flex flex-col items-center justify-center">
        <div class="px-1 md:px-16 mb-24 flex flex-col gap-6">
            <h2 class="text-2xl font-semibold">Reset Password</h2>
        </div>

        <form @submit="resetEmail"  class="flex flex-col  gap-10 w-[1000px]">
        <div class="flex flex-col items-center md:flex-row gap-4 w-full px-4 md:px-16">
            <div class="flex flex-col w-full">
            <label for="">Email </label>
            <input
                v-model="forgotemail"
                type="email"
                placeholder="Your Email Address"
                class="border bg-transparent rounded border-black py-3 px-2"
                required
            />
            </div>
        </div>

        <div class="pb-5 md:pb-0">
            <authButton
            message="Send Email Reset Link"
            :loading="loading"
            />
        </div>
        </form>
    </div>
</template>


<script setup lang="ts">
definePageMeta({
  layout: "brands-auth",
  colorMode: "light"
});

import { ref } from "vue";
import type { ResponseMessage } from "types";
import { useToast } from "../../components/ui/toast/use-toast";
import { forgotPassword } from "@/api/auth/auth";

// variable decalrations
const device = useDevice()
const userStore = useUserStore();
const { toast } = useToast();
const config = useRuntimeConfig();
const API_URL = config.public.API_URL;
const forgotemail  = ref<string>("");
const loading = ref(false);
const email = ref<string>("");


//api calls
const resetEmail = async (e:Event) => {
  e.preventDefault()
  if(forgotemail.value)
  try {
    //old direct implementation
    // const res = await $fetch<ResponseMessage>(`${API_URL}/auth/forgot-password`, {
    //   method: "post",
    //   body: { email: forgotemail.value },
    // });

    const res = await forgotPassword({
      apiUrl: API_URL as string,
      email:forgotemail.value
    })

    toast({ title: res });
    setTimeout(() => {
      navigateTo(`/brands/new-password/${forgotemail.value}`);
    }, 3000);
  } catch (error: any) {
    toast({ title: error.data?.message || "Unable to Reset Password. Please try again" });
  }
};
</script>