<script setup lang="ts">
//imports
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
const { forgotemail } = storeToRefs(userStore);
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
      apiUrl:API_URL,
      email:forgotemail.value
    })

    toast({ title: res });
    setTimeout(() => {
      navigateTo("/creator/newPassword");
    }, 3000);
  } catch (error: any) {
    toast({ title: error.data?.message || "Unable to Reset Password. Please try again" });
  }
};
</script>

<template>
  <div v-if="device.isMobile" >
    <div
      class="px-4 py-2 border-[#EAEAEB] flex justify-center items-center text-center w-full border-b-[1px]"
    >
      <h1 class="text-center font-bold">Request New Pasword</h1>
    </div>

    <div class="px-8 pt-8">
      <img src="/assets/icons/AktivateAuthLogo.svg" class="h-[40px]" alt="">
    </div>
    

    <div class="p-8 flex w-full">
      <form @submit="resetEmail" class="flex flex-col gap-4 w-full">
        <label for="Email Address">Email address</label>
        <input
          type="text"
          v-model="forgotemail"
          class="rounded-[6px] border-[1px] p-3 w-full"
          placeholder="Enter email address"
          required
        />

       

        <button
          type="submit"
          class="px-4 py-4 flex justify-center rounded-[8px] bg-purple1 text-white"
        >
          Send email reset link
        </button>
      </form>
    </div>
  </div>


  <div v-else >
    <nuxt-link to="/creator/login">
    <div class="p-4">
      <signBlackButton message="Login" />
    </div>
    </nuxt-link>

    <div class="px-4 md:px-16 mb-24 flex flex-col gap-6">
      <h2 class="text-3xl font-semibold">Reset Password</h2>
    </div>

    <form @submit="resetEmail"  class="flex flex-col gap-10">
      <div class="flex flex-col items-center md:flex-row gap-4 w-full px-4 md:px-16">
        <div class="flex flex-col w-full">
          <label for="">Email </label>
          <input
            v-model="forgotemail"
            type="email"
            placeholder="Your Email Address"
            class="border rounded border-black py-3 px-2"
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
